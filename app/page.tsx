"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Heart, Users, Activity, Calendar, Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [stats, setStats] = useState({
    totalDonors: 1250,
    bloodUnits: 890,
    requestsFulfilled: 2340,
    livesImpacted: 4680,
  })

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const bloodTypes = [
    { type: "A+", units: 45, status: "high" },
    { type: "A-", units: 12, status: "low" },
    { type: "B+", units: 38, status: "medium" },
    { type: "B-", units: 8, status: "critical" },
    { type: "AB+", units: 15, status: "low" },
    { type: "AB-", units: 5, status: "critical" },
    { type: "O+", units: 52, status: "high" },
    { type: "O-", units: 18, status: "medium" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">BloodBank+</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/donors"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Donors
              </Link>
              <Link
                href="/acceptors"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Recipients
              </Link>
              <Link
                href="/request"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Request Blood
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Save Lives
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Donate Blood
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our mission to save lives through blood donation. Every drop counts, every donation matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 px-8 py-3 bg-transparent"
              >
                Request Blood
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Total Donors", value: stats.totalDonors, color: "text-blue-600" },
              { icon: Activity, label: "Blood Units", value: stats.bloodUnits, color: "text-green-600" },
              { icon: Calendar, label: "Requests Fulfilled", value: stats.requestsFulfilled, color: "text-purple-600" },
              { icon: Heart, label: "Lives Impacted", value: stats.livesImpacted, color: "text-red-600" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Inventory */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blood Inventory</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Current blood stock levels across all types</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodTypes.map((blood, index) => (
              <Card
                key={index}
                className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{blood.type}</div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">{blood.units} units</div>
                  <Badge className={`${getStatusColor(blood.status)} text-white border-0`}>{blood.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Get started with our services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Heart className="mr-2 h-6 w-6" />
                  Become a Donor
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Register as a blood donor and help save lives in your community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Register Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Activity className="mr-2 h-6 w-6" />
                  Request Blood
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Submit a blood request for yourself or someone in need.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-purple-50">
                  Make Request
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="mr-2 h-6 w-6" />
                  Find Donors
                </CardTitle>
                <CardDescription className="text-green-100">
                  Search for blood donors in your area by blood type.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full bg-white text-green-600 hover:bg-green-50">
                  Search Donors
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">BloodBank+</span>
              </div>
              <p className="text-gray-400">Connecting donors with those in need. Every donation saves lives.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/donors" className="hover:text-white transition-colors">
                    Donors
                  </Link>
                </li>
                <li>
                  <Link href="/acceptors" className="hover:text-white transition-colors">
                    Recipients
                  </Link>
                </li>
                <li>
                  <Link href="/request" className="hover:text-white transition-colors">
                    Request Blood
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="hover:text-white transition-colors">
                    Eligibility Test
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@bloodbank.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Medical Center, City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BloodBank+. All rights reserved. Saving lives through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
