// app/api/auth/credentials/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { email, mobile, password, name, isLogin = false } = body;

  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  }

  if (!email && !mobile) {
    return NextResponse.json({ error: 'Email or mobile is required' }, { status: 400 });
  }

  const field = email ? 'email' : 'mobile';
  const value = email || mobile;

  let user = await User.findOne({ [field]: value });

  if (isLogin) {
    // ── LOGIN ───────────────────────────────────────
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (user.authProvider !== 'local' && user.authProvider !== 'mobile') {
      return NextResponse.json(
        { error: `Please login with ${user.authProvider} instead` },
        { status: 403 }
      );
    }

    const match = await bcrypt.compare(password, user.password || '');
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } else {
    // ── SIGNUP ──────────────────────────────────────
    if (user) {
      return NextResponse.json(
        { error: `${field === 'email' ? 'Email' : 'Mobile'} already exists` },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    const createData = {
      password: hashed,
      authProvider: field === 'email' ? 'local' : 'mobile',
      [field]: value,
    };

    if (name) createData.name = name;

    user = await User.create(createData);
  }

  const token = generateToken(user._id.toString());

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      authProvider: user.authProvider,
    },
  });
}