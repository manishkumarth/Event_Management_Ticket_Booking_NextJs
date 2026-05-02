import ThemeToggle from "@/components/ThemeToggle";

function HomePage() {
    return (
        <>
            This is Home Page
            <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-4">
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
            </div>
        </>
    )
}
export default HomePage;