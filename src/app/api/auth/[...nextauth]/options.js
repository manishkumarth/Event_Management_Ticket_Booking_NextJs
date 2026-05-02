import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import { connectDB } from "@/lib/db"
import bcrypt from "bcryptjs"
import GoogleProvider from 'next-auth/providers/google'
export const authOption = {
    providers: [
        //  GitHub Login
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //         scope: "read:user user:email", //   important for email
            //     },
            // },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // GOOGLE_CLIENT_ID
        // GOOGLE_CLIENT_SECRET

        //  Email + Password Login
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    await connectDB()

                    console.log("credentials:", credentials)

                    //  extract only needed fields
                    const email = credentials?.email
                    const password = credentials?.password

                    if (!email || !password) {
                        console.log("Missing email/password")
                        return null
                    }

                    const user = await User.findOne({ email })
                    console.log("user:", user)

                    if (!user) {
                        console.log("User not found")
                        return null
                    }

                    if (!user.password) {
                        console.log("OAuth user")
                        return null
                    }

                    const isMatch = await bcrypt.compare(password, user.password)

                    if (!isMatch) {
                        console.log("Wrong password")
                        return null
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }

                } catch (error) {
                    console.error("AUTH ERROR:", error)
                    return null
                }
            }
        }),
    ],

    callbacks: {
        //  GitHub login handling
        async signIn({ user, account, profile }) {
            await connectDB()

            // Handle both GitHub + Google
            if (account.provider === "github" || account.provider === "google") {

                let dbUser = await User.findOne({
                    $or: [
                        { githubId: profile?.id },
                        { googleId: profile?.sub }, // Google uses "sub"
                    ],
                })

                // Check by email (link account)
                if (!dbUser && user.email) {
                    dbUser = await User.findOne({ email: user.email })

                    if (dbUser) {
                        if (account.provider === "github") {
                            dbUser.githubId = profile.id
                        }
                        if (account.provider === "google") {
                            dbUser.googleId = profile.sub
                        }

                        dbUser.profilePic = user.image
                        dbUser.authProvider = account.provider
                        await dbUser.save()
                    }
                }

                // Create new user
                if (!dbUser) {
                    dbUser = await User.create({
                        name: user.name,
                        email: user.email || "",
                        githubId: account.provider === "github" ? profile.id : undefined,
                        googleId: account.provider === "google" ? profile.sub : undefined,
                        profilePic: user.image,
                        authProvider: account.provider,
                        role: "user",
                    })
                }

                user.id = dbUser._id.toString()
                user.role = dbUser.role
            }

            return true
        },

        async jwt({ token, user, account }) {
            console.log("JWT CALLBACK USER:", user)
            console.log("JWT CALLBACK TOKEN BEFORE:", token)

            if (user) {
                token.id = user.id
                token.role = user.role
                token.provider = account?.provider || "credentials"
            }

            console.log("JWT CALLBACK TOKEN AFTER:", token)

            return token
        },

        async session({ session, token }) {
            console.log("SESSION CALLBACK TOKEN:", token)

            session.user.id = token.id
            session.user.role = token.role
            session.user.provider = token.provider

            return session
        }

        //  Redirect
        // async redirect({ url, baseUrl }) {
        //     return baseUrl + "/profile"
        // }
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
}