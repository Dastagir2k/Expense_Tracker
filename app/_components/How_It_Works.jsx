import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


function How_It_Works() {
    return (
        <div>
            <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                        How It Works
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Start your financial journey in three simple steps
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our intuitive process gets you up and running in minutes, not hours.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
                    <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold">
                            1
                        </div>
                        <div className="mt-6 space-y-2">
                            <h3 className="text-xl font-bold">Create Your Account</h3>
                            <p className="text-muted-foreground">
                                Sign up in seconds and set your financial goals and budget limits.
                            </p>
                        </div>
                        <div className="hidden md:block absolute top-8 left-full w-24 h-0.5 bg-emerald-200"></div>
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold">
                            2
                        </div>
                        <div className="mt-6 space-y-2">
                            <h3 className="text-xl font-bold">Connect Your Finances</h3>
                            <p className="text-muted-foreground">
                                Link your accounts or manually track expenses with our easy-to-use interface.
                            </p>
                        </div>
                        <div className="hidden md:block absolute top-8 left-full w-24 h-0.5 bg-emerald-200"></div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold">
                            3
                        </div>
                        <div className="mt-6 space-y-2">
                            <h3 className="text-xl font-bold">Get Smart Insights</h3>
                            <p className="text-muted-foreground">
                                Receive AI-powered recommendations, alerts, and motivation to improve your finances.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex justify-center">
                    <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                        <Link href="/signup">
                            Start Your Financial Journey
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    </div>
    )
}

export default How_It_Works