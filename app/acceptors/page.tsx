"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Search, MapPin, Phone, Mail, Calendar } from "lucide-react"

export default function AcceptorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const acceptors = [
    {
      id: 1,
      name: "Bhawana Sen",
      bloodType: "O-",
      location: "Pune, Maharashtra",
      phone: "+91 98765 43211",
      email: "bhawana.sen@email.com",
      requestDate: "2024-02-25",
      urgency: "high",
      hospital: "City General Hospital",
      status: "active",
    },
    {
      id: 2,
      name: "Amit Kumar",
      bloodType: "A+",
      location: "Gurgaon, Haryana",
      phone: "+91 87654 32110",
      email: "amit.kumar@email.com",
      requestDate: "2024-02-24",
      urgency: "medium",
      hospital: "Metro Medical Center",
      status: "fulfilled",
    },
    {
      id: 3,
      name: "Sneha Patel",
      bloodType: "B-",
      location: "Ahmedabad, Gujarat",
      phone: "+91 76543 21099",
      email: "sneha.patel@email.com",
      requestDate: "2024-02-26",
      urgency: "high",
      hospital: "Gujarat Medical College",
      status: "active",
    },
    {
      id: 4,
      name: "Rajesh Gupta",
      bloodType: "AB+",
      location: "Jaipur, Rajasthan",
      phone: "+91 65432 10988",
      email: "rajesh.gupta@email.com",
      requestDate: "2024-02-23",
      urgency: "low",
      hospital: "Rajasthan Hospital",
      status: "fulfilled",
    },
  ]

  const filteredAcceptors = acceptors.filter(
    (acceptor) =>
      acceptor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acceptor.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acceptor.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500 text-white"
      case "fulfilled":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blood Recipients</h1>
                <p className="text-gray-600 dark:text-gray-300">People who need blood donations</p>
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

        {/* Recipients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAcceptors.map((acceptor) => (
            <Card
              key={acceptor.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{acceptor.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className={getUrgencyColor(acceptor.urgency)}>{acceptor.urgency} priority</Badge>
                    <Badge className={getStatusColor(acceptor.status)}>{acceptor.status}</Badge>
                  </div>
                </div>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-lg font-semibold text-red-600 border-red-600">
                      {acceptor.bloodType}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-300">needed</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{acceptor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{acceptor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{acceptor.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Requested: {acceptor.requestDate}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Hospital:</strong> {acceptor.hospital}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    disabled={acceptor.status === "fulfilled"}
                    variant={acceptor.status === "active" ? "default" : "secondary"}
                  >
                    {acceptor.status === "active" ? "Help Now" : "Request Fulfilled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAcceptors.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No recipients found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
