"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Search, MapPin, Phone, Mail } from "lucide-react"

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const donors = [
    {
      id: 1,
      name: "Garvita Jain",
      bloodType: "O+",
      location: "Mumbai, Maharashtra",
      phone: "+91 98765 43210",
      email: "garvita.jain@email.com",
      lastDonation: "2024-01-15",
      totalDonations: 12,
      status: "available",
    },
    {
      id: 2,
      name: "Govind Jangid",
      bloodType: "A+",
      location: "Delhi, NCR",
      phone: "+91 87654 32109",
      email: "govind.jangid@email.com",
      lastDonation: "2024-02-20",
      totalDonations: 8,
      status: "available",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      bloodType: "B+",
      location: "Bangalore, Karnataka",
      phone: "+91 76543 21098",
      email: "rahul.sharma@email.com",
      lastDonation: "2024-01-30",
      totalDonations: 15,
      status: "not-available",
    },
    {
      id: 4,
      name: "Priya Singh",
      bloodType: "AB+",
      location: "Chennai, Tamil Nadu",
      phone: "+91 65432 10987",
      email: "priya.singh@email.com",
      lastDonation: "2024-02-10",
      totalDonations: 6,
      status: "available",
    },
  ]

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blood Donors</h1>
                <p className="text-gray-600 dark:text-gray-300">Find and connect with blood donors</p>
              </div>
            </div>
            <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name, blood type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-700/80"
              />
            </div>
          </CardContent>
        </Card>

        {/* Donors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <Card
              key={donor.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{donor.name}</CardTitle>
                  <Badge
                    variant={donor.status === "available" ? "default" : "secondary"}
                    className={donor.status === "available" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
                  >
                    {donor.status === "available" ? "Available" : "Not Available"}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-lg font-semibold text-red-600 border-red-600">
                      {donor.bloodType}
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{donor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{donor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{donor.email}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Total Donations: {donor.totalDonations}</span>
                      <span>Last: {donor.lastDonation}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    disabled={donor.status !== "available"}
                    variant={donor.status === "available" ? "default" : "secondary"}
                  >
                    {donor.status === "available" ? "Contact Donor" : "Not Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No donors found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
