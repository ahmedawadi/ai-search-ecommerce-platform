"use client"

import { Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    content: "Amazing quality products and fast delivery. The customer service is exceptional!",
    rating: 5,
    avatar: "/diverse-group-avatars.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Business Owner",
    content: "Great selection of electronics. Competitive prices and reliable shipping.",
    rating: 5,
    avatar: "/diverse-group-avatars.png",
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Student",
    content: "Perfect for finding accessories and gadgets. Love the image search feature!",
    rating: 5,
    avatar: "/diverse-group-avatars.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Customer Reviews</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">See what our customers have to say about ShopHub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-neutral-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-neutral-700 mb-6 line-clamp-4">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-neutral-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
