import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, Lightbulb, Sparkles, TrendingUp } from "lucide-react"


function Feature() {
    return (

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Features</div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Smart features to transform your financial habits
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our expense tracker combines cutting-edge technology with practical financial tools to help you save
                            more and spend wisely.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <TrendingUp className="h-10 w-10 text-emerald-500" />
                            <CardTitle className="mt-4">Live Expense Tracking</CardTitle>
                            <CardDescription>
                                Monitor your spending in real-time with automatic categorization and instant updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Real-time transaction updates</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Automatic expense categorization</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Visual spending breakdowns</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Bell className="h-10 w-10 text-emerald-500" />
                            <CardTitle className="mt-4">Smart Notifications</CardTitle>
                            <CardDescription>
                                Receive timely alerts when you're approaching or exceeding your spending limits.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Customizable budget thresholds</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Instant limit exceeded alerts</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Weekly spending summaries</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Lightbulb className="h-10 w-10 text-emerald-500" />
                            <CardTitle className="mt-4">Motivational Quotes & Tips</CardTitle>
                            <CardDescription>
                                Stay motivated with personalized financial wisdom and encouragement.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Daily financial motivation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Personalized saving tips</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Milestone celebration reminders</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Sparkles className="h-10 w-10 text-emerald-500" />
                            <CardTitle className="mt-4">AI-Powered Insights</CardTitle>
                            <CardDescription>
                                Leverage artificial intelligence to uncover spending patterns and optimize your budget.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Predictive spending analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Smart saving recommendations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    <span>Personalized financial goals</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


    )
}

export default Feature