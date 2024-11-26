import React from "react";
import { TrendingUp, Wallet, Users, BarChart3, PieChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LandingImage3 from "../assets/landing3.jpeg"

export default function Landing() {
  return (
    <main className="flex max-w-7xl mx-auto flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <GetStartedSection />
    </main>
  )
}

const GetStartedSection = () => {
  return (
    <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-primary-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Managing Your Finances Today</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Join over a million users who have taken control of their financial future with our expense tracker.
          </p>
          <Link href="/login">
            <Button size="lg">Sign Up for Free</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}


const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-20 lg:py-0">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Powerful Features</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <TrendingUp className="w-8 h-8 mb-2" />
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              Gain insights into your spending habits with detailed charts and reports.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 mb-2" />
              <CardTitle>Shared Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              Easily split bills and track shared expenses with family and friends.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <PieChart className="w-8 h-8 mb-2" />
              <CardTitle>Budget Planning</CardTitle>
            </CardHeader>
            <CardContent>
              Set and manage budgets for different categories to stay on top of your financial goals.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


const HeroSection = () => {
  return (
    <section className="w-full py-10 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master Your Finances with Ease
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Track, analyze, and optimize your expenses. Take control of your financial future with our powerful and intuitive expense tracker.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button size="lg" className="w-full min-[400px]:w-auto">Start for Free</Button>
              </Link>
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-primary" />
                <span>Easy Expense Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Insightful Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-primary" />
                <span>Smart Budget Planning</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
              <Image
                src={LandingImage3}
                alt="Expense Tracker Dashboard"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
