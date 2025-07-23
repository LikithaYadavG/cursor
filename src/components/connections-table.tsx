"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState
} from "@tanstack/react-table"
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  ExternalLink,
  Mail,
  MapPin,
  Building
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Contact, mockContacts, mockExperiences } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const columnHelper = createColumnHelper<Contact>()

export const ConnectionsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [personaFilter, setPersonaFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")

  const getExperiencesForContact = (contactId: number) => {
    return mockExperiences.filter(exp => exp.contact_id === contactId)
  }

  const columns = useMemo(() => [
    columnHelper.accessor("first_name", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          First Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          {row.getValue("first_name")}
        </div>
      ),
    }),
    columnHelper.accessor("last_name", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Last Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          {row.getValue("last_name")}
        </div>
      ),
    }),
    columnHelper.accessor("linkedin_profile_url", {
      header: "LinkedIn Profile",
      cell: ({ row }) => (
        <a
          href={row.getValue("linkedin_profile_url")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View Profile
        </a>
      ),
    }),
    columnHelper.accessor(
      (row) => `${row.location_city}, ${row.location_state}, ${row.location_country}`,
      {
        id: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">
              {row.original.location_city}, {row.original.location_state}, {row.original.location_country}
            </span>
          </div>
        ),
      }
    ),
    columnHelper.accessor("company_name", {
      header: "Company",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <div className="font-medium text-gray-900">
              {row.getValue("company_name")}
            </div>
            {row.original.company_website && (
              <a
                href={`https://${row.original.company_website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {row.original.company_website}
              </a>
            )}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("industry", {
      header: "Industry",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.getValue("industry")}
        </span>
      ),
    }),
    columnHelper.accessor("current_role", {
      header: "Current Role",
      cell: ({ row }) => (
        <div className="font-medium text-gray-700">
          {row.getValue("current_role")}
        </div>
      ),
    }),
    columnHelper.accessor("email_address", {
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email_address") as string | null
        return email ? (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Mail className="w-4 h-4 mr-1" />
            {email}
          </a>
        ) : (
          <span className="text-gray-400 text-sm">Not available</span>
        )
      },
    }),
    columnHelper.accessor("buyer_persona_type", {
      header: "Buyer Persona",
      cell: ({ row }) => {
        const persona = row.getValue("buyer_persona_type") as string
        const colors = {
          "Executive": "bg-purple-100 text-purple-800",
          "Technical Decision Maker": "bg-green-100 text-green-800",
          "Tech Practitioner": "bg-blue-100 text-blue-800",
          "Sales Leader": "bg-orange-100 text-orange-800",
          "Budget Owner": "bg-red-100 text-red-800",
        }
        return (
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            colors[persona as keyof typeof colors] || "bg-gray-100 text-gray-800"
          )}>
            {persona}
          </span>
        )
      },
    }),
    columnHelper.accessor("connection_date", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Connection Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {new Date(row.getValue("connection_date")).toLocaleDateString()}
        </div>
      ),
    }),
  ], [])

  const filteredData = useMemo(() => {
    let data = mockContacts

    if (personaFilter !== "all") {
      data = data.filter(contact => contact.buyer_persona_type === personaFilter)
    }

    if (countryFilter !== "all") {
      data = data.filter(contact => contact.location_country === countryFilter)
    }

    return data
  }, [personaFilter, countryFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const uniquePersonas = Array.from(new Set(mockContacts.map(c => c.buyer_persona_type)))
  const uniqueCountries = Array.from(new Set(mockContacts.map(c => c.location_country)))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-2xl font-bold text-gray-900">
            LinkedIn Connections
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search connections..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={personaFilter}
                onChange={(e) => setPersonaFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Personas</option>
                {uniquePersonas.map(persona => (
                  <option key={persona} value={persona}>{persona}</option>
                ))}
              </select>
              
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No connections found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}