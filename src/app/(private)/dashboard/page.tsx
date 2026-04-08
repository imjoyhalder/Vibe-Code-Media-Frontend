
export default function dashboardPage(){
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
                This is a protected page. You can only see this if you are logged in.
            </p>
        </div>
    )
}