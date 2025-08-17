// Blood Bank Management System - Multi-page JavaScript

class BloodBankSystem {
  constructor() {
    this.initializeData()
    this.init()
  }

  initializeData() {
    // Initialize with specific donors as requested
    if (!localStorage.getItem("donors")) {
      const initialDonors = [
        {
          id: "1",
          name: "Garvita Jain",
          age: 19,
          bloodType: "A+",
          phone: "+91-9876543210",
          email: "garvita.jain@email.com",
          address: "123 Medical Street, Healthcare City",
          registrationDate: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Govind Jangid",
          age: 19,
          bloodType: "O+",
          phone: "+91-9876543211",
          email: "govind.jangid@email.com",
          address: "456 Donor Avenue, Blood City",
          registrationDate: new Date().toISOString(),
        },
      ]
      localStorage.setItem("donors", JSON.stringify(initialDonors))
    }

    // Initialize with specific acceptor as requested
    if (!localStorage.getItem("acceptors")) {
      const initialAcceptors = [
        {
          id: "1",
          name: "Bhawana Sen",
          age: 25,
          bloodTypeNeeded: "B+",
          phone: "+91-9876543212",
          email: "bhawana.sen@email.com",
          condition: "Surgery requirement",
          urgency: "High",
          registrationDate: new Date().toISOString(),
        },
      ]
      localStorage.setItem("acceptors", JSON.stringify(initialAcceptors))
    }

    // Initialize blood inventory
    if (!localStorage.getItem("bloodInventory")) {
      const inventory = {
        "A+": 45,
        "A-": 23,
        "B+": 38,
        "B-": 15,
        "AB+": 12,
        "AB-": 8,
        "O+": 67,
        "O-": 34,
      }
      localStorage.setItem("bloodInventory", JSON.stringify(inventory))
    }
  }

  init() {
    this.setupMobileMenu()
    this.setupThemeToggle()
    this.animateCounters()
    this.loadBloodInventoryPreview()
    this.initializeTheme()
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        this.toggleTheme()
      })
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
  }

  updateThemeIcon(theme) {
    const themeIcon = document.querySelector(".theme-icon")
    if (themeIcon) {
      themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
    }
  }

  setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })

      // Close menu when clicking on links
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        })
      })
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.textContent)
      const duration = 2000
      const step = target / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          counter.textContent = target
          clearInterval(timer)
        } else {
          counter.textContent = Math.floor(current)
        }
      }, 16)
    })
  }

  loadBloodInventoryPreview() {
    const previewContainer = document.getElementById("blood-inventory-preview")
    if (!previewContainer) return

    const inventory = JSON.parse(localStorage.getItem("bloodInventory")) || {}
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

    previewContainer.innerHTML = ""

    bloodTypes.forEach((type) => {
      const units = inventory[type] || 0
      const card = document.createElement("div")
      card.className = "blood-card"
      card.innerHTML = `
                <div class="blood-group">${type}</div>
                <div class="blood-units">${units} units</div>
            `
      previewContainer.appendChild(card)
    })
  }

  // Donor management functions
  static addDonor(donorData) {
    const donors = JSON.parse(localStorage.getItem("donors")) || []
    donorData.id = Date.now().toString()
    donorData.registrationDate = new Date().toISOString()
    donors.push(donorData)
    localStorage.setItem("donors", JSON.stringify(donors))
    return true
  }

  static getDonors() {
    return JSON.parse(localStorage.getItem("donors")) || []
  }

  static searchDonors(query, bloodType) {
    const donors = this.getDonors()
    return donors.filter((donor) => {
      const matchesQuery = !query || donor.name.toLowerCase().includes(query.toLowerCase())
      const matchesBloodType = !bloodType || donor.bloodType === bloodType
      return matchesQuery && matchesBloodType
    })
  }

  // Acceptor management functions
  static addAcceptor(acceptorData) {
    const acceptors = JSON.parse(localStorage.getItem("acceptors")) || []
    acceptorData.id = Date.now().toString()
    acceptorData.registrationDate = new Date().toISOString()
    acceptors.push(acceptorData)
    localStorage.setItem("acceptors", JSON.stringify(acceptors))
    return true
  }

  static getAcceptors() {
    return JSON.parse(localStorage.getItem("acceptors")) || []
  }

  // Blood request functions
  static submitBloodRequest(requestData) {
    const requests = JSON.parse(localStorage.getItem("bloodRequests")) || []
    requestData.id = Date.now().toString()
    requestData.requestDate = new Date().toISOString()
    requestData.status = "pending"
    requests.push(requestData)
    localStorage.setItem("bloodRequests", JSON.stringify(requests))
    return true
  }

  // Eligibility test function
  static checkEligibility(testData) {
    let eligible = true
    const reasons = []

    // Age check
    if (testData.age < 18 || testData.age > 65) {
      eligible = false
      reasons.push("Age must be between 18-65 years")
    }

    // Weight check
    if (testData.weight < 50) {
      eligible = false
      reasons.push("Weight must be at least 50 kg")
    }

    // Recent donation check
    if (testData.recentDonation === "yes") {
      eligible = false
      reasons.push("Must wait 3 months between donations")
    }

    // Recent illness check
    if (testData.recentIllness === "yes") {
      eligible = false
      reasons.push("Must be free from illness for at least 2 weeks")
    }

    // Chronic conditions check
    if (testData.chronicConditions === "yes") {
      eligible = false
      reasons.push("Chronic conditions may affect eligibility")
    }

    return { eligible, reasons }
  }

  // Contact form submission
  static submitContactForm(formData) {
    const contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || []
    formData.id = Date.now().toString()
    formData.submissionDate = new Date().toISOString()
    contacts.push(formData)
    localStorage.setItem("contactSubmissions", JSON.stringify(contacts))
    return true
  }

  // Utility functions
  static showModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = "block"
    }
  }

  static closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = "none"
    }
  }

  static validateForm(formData, rules) {
    const errors = {}

    for (const field in rules) {
      const rule = rules[field]
      const value = formData[field]

      if (rule.required && (!value || value.trim() === "")) {
        errors[field] = `${rule.label} is required`
        continue
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = `${rule.label} must be at least ${rule.minLength} characters`
      }

      if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field] = "Please enter a valid email address"
      }

      if (rule.phone && value && !/^[+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ""))) {
        errors[field] = "Please enter a valid phone number"
      }

      if (rule.min && value && Number.parseInt(value) < rule.min) {
        errors[field] = `${rule.label} must be at least ${rule.min}`
      }

      if (rule.max && value && Number.parseInt(value) > rule.max) {
        errors[field] = `${rule.label} must not exceed ${rule.max}`
      }
    }

    return errors
  }
}

// Global utility functions for all pages
window.BloodBankSystem = BloodBankSystem

// Initialize system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BloodBankSystem()
})

// Add modal close functionality for all pages
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    const modal = e.target.closest(".modal")
    if (modal) {
      modal.style.display = "none"
    }
  }
})

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none"
  }
})
