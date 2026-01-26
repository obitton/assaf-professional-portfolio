"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  Search, Plus, Trash2, Edit2, BarChart3, TrendingUp, PieChartIcon,
  Hexagon, Info, Loader2, ArrowLeft, BookOpen, X, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"

// Country full names for display
const COUNTRY_NAMES: Record<string, string> = {
  FRA: "France",
  GER: "Germany",
  USA: "United States",
  CHI: "China",
  RUS: "Russia",
  JAP: "Japan",
}

type SportData = {
  id: number
  sport: string
  FRA: number
  GER: number
  USA: number
  CHI: number
  RUS: number
  JAP: number
}

type ChartType = "bar" | "line" | "pie" | "radar" | "scatter"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
]

const COUNTRY_COLORS: Record<string, string> = {
  FRA: "#0055A4",
  GER: "#DD0000",
  USA: "#3C3B6E",
  CHI: "#DE2910",
  RUS: "#0039A6",
  JAP: "#BC002D",
}

const WIKI_PAGE_MAPPING: Record<string, string> = {
  "VOLLEYBALL": "Volleyball",
  "SOCCER": "Association_football",
  "BASKETBALL": "Basketball",
  "MARATHON": "Marathon",
  "TENNIS": "Tennis",
  "RUGBY": "Rugby_union",
  "BOX": "Boxing",
  "GOLF": "Golf",
  "CRICKET": "Cricket",
  "F1": "Formula_One",
  "PING PONG": "Table_tennis",
  "GYMNASTICS": "Gymnastics",
}

export default function SportsAnalyticsPage() {
  const [data, setData] = useState<SportData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSport, setEditingSport] = useState<SportData | null>(null)

  // Wikipedia search state
  const [wikiSearchTerm, setWikiSearchTerm] = useState("")
  const [wikiResult, setWikiResult] = useState<{
    title: string
    extract: string
    thumbnail?: string
    url: string
  } | null>(null)
  const [wikiLoading, setWikiLoading] = useState(false)
  const [wikiError, setWikiError] = useState<string | null>(null)

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    sport: "",
    FRA: "",
    GER: "",
    USA: "",
    CHI: "",
    RUS: "",
    JAP: "",
  })

  // Fetch and parse CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/sports-data.csv")
        if (!response.ok) throw new Error("Failed to fetch data")

        const text = await response.text()
        const lines = text.trim().split("\n")

        const parsedData: SportData[] = lines.slice(1).map((line, index) => {
          const values = line.split(",")
          return {
            id: index + 1,
            sport: values[0],
            FRA: parseInt(values[1]) || 0,
            GER: parseInt(values[2]) || 0,
            USA: parseInt(values[3]) || 0,
            CHI: parseInt(values[4]) || 0,
            RUS: parseInt(values[5]) || 0,
            JAP: parseInt(values[6]) || 0,
          }
        })

        setData(parsedData)
        setLoading(false)
      } catch (err) {
        setError("Failed to load sports data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const countries = ["FRA", "GER", "USA", "CHI", "RUS", "JAP"] as const

  // Filter data based on search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.sport.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  // Chart data transformations
  const barChartData = useMemo(() => {
    if (selectedCountry === "all") {
      return filteredData.map((item) => ({
        sport: item.sport,
        ...countries.reduce((acc, country) => ({
          ...acc,
          [country]: item[country],
        }), {}),
      }))
    }
    return filteredData.map((item) => ({
      sport: item.sport,
      value: item[selectedCountry as keyof SportData],
    }))
  }, [filteredData, selectedCountry])

  const pieChartData = useMemo(() => {
    const sportToUse = selectedSport || filteredData[0]?.sport
    const sportData = filteredData.find((d) => d.sport === sportToUse)
    if (!sportData) return []
    return countries.map((country) => ({
      name: COUNTRY_NAMES[country],
      value: sportData[country],
      code: country,
    }))
  }, [filteredData, selectedSport])

  const radarChartData = useMemo(() => {
    return filteredData.slice(0, 8).map((item) => ({
      sport: item.sport,
      ...countries.reduce((acc, country) => ({
        ...acc,
        [COUNTRY_NAMES[country]]: item[country],
      }), {}),
    }))
  }, [filteredData])

  const scatterData = useMemo(() => {
    return countries.flatMap(country =>
      filteredData.map(item => ({
        x: filteredData.indexOf(item),
        y: item[country],
        sport: item.sport,
        country: COUNTRY_NAMES[country],
        countryCode: country,
      }))
    )
  }, [filteredData])

  // Stats summary
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null

    const countryAverages = countries.map((country) => {
      const avg = filteredData.reduce((sum, item) => sum + item[country], 0) / filteredData.length
      return { country, avg: avg.toFixed(2), fullName: COUNTRY_NAMES[country] }
    }).sort((a, b) => parseFloat(a.avg) - parseFloat(b.avg))

    const topPerformers = countries.map((country) => {
      const best = filteredData.reduce((best, item) =>
        item[country] < best.value ? { sport: item.sport, value: item[country] } : best
        , { sport: "", value: Infinity })
      return { country, fullName: COUNTRY_NAMES[country], ...best }
    })

    return { countryAverages, topPerformers, totalSports: filteredData.length }
  }, [filteredData])

  // Wikipedia API search
  const searchWikipedia = async (termOverride?: string) => {
    const termToSearch = termOverride || wikiSearchTerm;
    if (!termToSearch.trim()) return

    setWikiLoading(true)
    setWikiError(null)
    setWikiResult(null)

    try {
      // Map sport name to Wikipedia page title, strictly following the mapping or falling back to Title Case
      const cleanTerm = termToSearch.trim();
      const wikiPageTitle = WIKI_PAGE_MAPPING[cleanTerm.toUpperCase()] ||
        cleanTerm.charAt(0).toUpperCase() + cleanTerm.slice(1).toLowerCase();

      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPageTitle)}`
      )

      if (response.ok) {
        const data = await response.json()
        setWikiResult({
          title: data.title,
          extract: data.extract || "No description available.",
          thumbnail: data.thumbnail?.source,
          url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiSearchTerm)}`,
        })
      } else if (response.status === 404) {
        setWikiError(`No Wikipedia article found for "${wikiSearchTerm}". Try a different search term.`)
      } else {
        setWikiError("Failed to fetch from Wikipedia. Please try again.")
      }
    } catch {
      setWikiError("Network error. Please check your connection and try again.")
    }

    setWikiLoading(false)
  }

  // Quick lookup for a sport from the data
  const lookupSportFromData = (sportName: string) => {
    setWikiSearchTerm(sportName)
    searchWikipedia()
  }

  // CRUD Operations
  const handleAdd = () => {
    const newSport: SportData = {
      id: Math.max(...data.map(d => d.id), 0) + 1,
      sport: formData.sport.toUpperCase(),
      FRA: parseInt(formData.FRA) || 0,
      GER: parseInt(formData.GER) || 0,
      USA: parseInt(formData.USA) || 0,
      CHI: parseInt(formData.CHI) || 0,
      RUS: parseInt(formData.RUS) || 0,
      JAP: parseInt(formData.JAP) || 0,
    }
    setData([...data, newSport])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingSport) return
    setData(data.map(item =>
      item.id === editingSport.id
        ? {
          ...item,
          sport: formData.sport.toUpperCase(),
          FRA: parseInt(formData.FRA) || 0,
          GER: parseInt(formData.GER) || 0,
          USA: parseInt(formData.USA) || 0,
          CHI: parseInt(formData.CHI) || 0,
          RUS: parseInt(formData.RUS) || 0,
          JAP: parseInt(formData.JAP) || 0,
        }
        : item
    ))
    setEditingSport(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id))
  }

  const resetForm = () => {
    setFormData({ sport: "", FRA: "", GER: "", USA: "", CHI: "", RUS: "", JAP: "" })
  }

  const startEdit = (item: SportData) => {
    setEditingSport(item)
    setFormData({
      sport: item.sport,
      FRA: item.FRA.toString(),
      GER: item.GER.toString(),
      USA: item.USA.toString(),
      CHI: item.CHI.toString(),
      RUS: item.RUS.toString(),
      JAP: item.JAP.toString(),
    })
  }

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    const tooltipStyle = {
      backgroundColor: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      color: "hsl(var(--foreground))",
      borderRadius: "8px",
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="sport"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Ranking (Lower is Better)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              {selectedCountry === "all" ? (
                countries.map((country, index) => (
                  <Bar
                    key={country}
                    dataKey={country}
                    name={COUNTRY_NAMES[country]}
                    fill={CHART_COLORS[index]}
                    radius={[2, 2, 0, 0]}
                  />
                ))
              ) : (
                <Bar dataKey="value" name={COUNTRY_NAMES[selectedCountry]} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="sport"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              {selectedCountry === "all" ? (
                countries.map((country, index) => (
                  <Line
                    key={country}
                    type="monotone"
                    dataKey={country}
                    name={COUNTRY_NAMES[country]}
                    stroke={CHART_COLORS[index]}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS[index], strokeWidth: 2 }}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  dataKey="value"
                  name={COUNTRY_NAMES[selectedCountry]}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <div className="space-y-4">
            <Select value={selectedSport || filteredData[0]?.sport || ""} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-[200px] bg-input border-border text-foreground">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {filteredData.map((item) => (
                  <SelectItem key={item.sport} value={item.sport} className="text-foreground">
                    {item.sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={150}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[entry.code] || CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="sport"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 8]}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              {countries.map((country, index) => (
                <Radar
                  key={country}
                  name={COUNTRY_NAMES[country]}
                  dataKey={COUNTRY_NAMES[country]}
                  stroke={CHART_COLORS[index]}
                  fill={CHART_COLORS[index]}
                  fillOpacity={0.15}
                />
              ))}
              <Legend />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        )

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="x"
                name="Sport Index"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Ranking"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, name: string, props: any) => [
                  `Ranking: ${value}`,
                  `${props.payload.country} - ${props.payload.sport}`
                ]}
              />
              <Legend />
              {countries.map((country, index) => (
                <Scatter
                  key={country}
                  name={COUNTRY_NAMES[country]}
                  data={scatterData.filter(d => d.countryCode === country)}
                  fill={COUNTRY_COLORS[country]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        )
    }
  }

  const SportForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-foreground">Sport Name</Label>
        <Input
          id="sport"
          value={formData.sport}
          onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
          className="bg-input border-border text-foreground"
          placeholder="e.g., SWIMMING"
        />
      </div>
      <p className="text-sm text-muted-foreground">Enter rankings for each country (lower is better):</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country) => (
          <div key={country} className="space-y-2">
            <Label htmlFor={country} className="text-foreground">{COUNTRY_NAMES[country]}</Label>
            <Input
              id={country}
              type="number"
              min="1"
              max="10"
              value={formData[country]}
              onChange={(e) => setFormData({ ...formData, [country]: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="1-10"
            />
          </div>
        ))}
      </div>
      <Button onClick={onSubmit} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
        {submitLabel}
      </Button>
    </div>
  )

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/#work"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="space-y-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                Interactive Project
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                International Sports Rankings Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
                An interactive dashboard for exploring and analyzing international sports rankings across six countries.
                Features data visualization, CRUD operations, and Wikipedia API integration for sport information lookup.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Python (Original)", "React", "Recharts", "Wikipedia API", "CSV Parsing", "CRUD Operations"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Data Management
              </TabsTrigger>
              <TabsTrigger value="wiki" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Globe className="h-4 w-4 mr-2" />
                Sport Lookup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-8">
              {/* Stats Summary */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Sports Tracked</p>
                    <p className="text-4xl font-bold text-foreground">{stats.totalSports}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground mb-1">Countries Compared</p>
                    <p className="text-4xl font-bold text-primary">6</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-sm text-muted-foreground mb-2">Best Average Ranking</p>
                    <p className="text-2xl font-bold text-foreground">{stats.countryAverages[0]?.fullName}</p>
                    <p className="text-sm text-muted-foreground">Avg: {stats.countryAverages[0]?.avg}</p>
                  </div>
                </div>
              )}

              {/* Chart Controls */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={chartType === "bar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("bar")}
                      className={chartType === "bar" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Bar
                    </Button>
                    <Button
                      variant={chartType === "line" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("line")}
                      className={chartType === "line" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Line
                    </Button>
                    <Button
                      variant={chartType === "pie" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("pie")}
                      className={chartType === "pie" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
                    >
                      <PieChartIcon className="h-4 w-4 mr-1" />
                      Pie
                    </Button>
                    <Button
                      variant={chartType === "radar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("radar")}
                      className={chartType === "radar" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
                    >
                      <Hexagon className="h-4 w-4 mr-1" />
                      Radar
                    </Button>
                    <Button
                      variant={chartType === "scatter" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("scatter")}
                      className={chartType === "scatter" ? "bg-primary text-primary-foreground" : "border-border text-foreground bg-transparent"}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Scatter
                    </Button>
                  </div>

                  {chartType !== "pie" && chartType !== "radar" && (
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                        <SelectValue placeholder="Filter by country" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="all" className="text-foreground">All Countries</SelectItem>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country} className="text-foreground">
                            {COUNTRY_NAMES[country]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {renderChart()}
              </div>

              {/* Country Rankings Table */}
              {stats && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Country Performance Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stats.countryAverages.map((item, index) => (
                      <div key={item.country} className={`p-4 rounded-lg ${index === 0 ? "bg-primary/10 border border-primary/30" : "bg-secondary"}`}>
                        <p className="text-sm text-muted-foreground">{item.fullName}</p>
                        <p className={`text-2xl font-bold ${index === 0 ? "text-primary" : "text-foreground"}`}>{item.avg}</p>
                        <p className="text-xs text-muted-foreground">Avg Ranking</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border text-foreground"
                  />
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Sport
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Add New Sport</DialogTitle>
                    </DialogHeader>
                    <SportForm onSubmit={handleAdd} submitLabel="Add Sport" />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Sport</TableHead>
                      {countries.map((country) => (
                        <TableHead key={country} className="text-muted-foreground text-center">
                          {country}
                        </TableHead>
                      ))}
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            {item.sport}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-primary"
                              onClick={() => {
                                setWikiSearchTerm(item.sport)
                                searchWikipedia(item.sport)
                              }}
                            >
                              <BookOpen className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        {countries.map((country) => (
                          <TableCell key={country} className="text-center">
                            <span className={`${item[country] <= 2 ? "text-primary font-semibold" : "text-foreground"}`}>
                              {item[country]}
                            </span>
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => startEdit(item)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card border-border max-w-lg">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground">Edit Sport</DialogTitle>
                                </DialogHeader>
                                <SportForm onSubmit={handleUpdate} submitLabel="Update Sport" />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="wiki" className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Sport Information Lookup</h3>
                <p className="text-muted-foreground mb-6">
                  Search for any sport to get information from Wikipedia. You can also click the book icon next to any sport in the data table for a quick lookup.
                </p>

                <div className="flex gap-4 mb-8">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter a sport name (e.g., Basketball, Tennis, Swimming)"
                      value={wikiSearchTerm}
                      onChange={(e) => setWikiSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchWikipedia()}
                      className="pl-10 bg-input border-border text-foreground"
                    />
                  </div>
                  <Button
                    onClick={() => searchWikipedia()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={wikiLoading || !wikiSearchTerm.trim()}
                  >
                    {wikiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                  </Button>
                </div>

                {/* Quick lookup buttons */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-3">Quick lookup from dataset:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.slice(0, 10).map((item) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground bg-transparent hover:bg-secondary"
                        onClick={() => {
                          setWikiSearchTerm(item.sport)
                          searchWikipedia(item.sport)
                        }}
                      >
                        {item.sport}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Wiki Result */}
                {wikiLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {wikiError && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
                    {wikiError}
                  </div>
                )}

                {wikiResult && (
                  <div className="bg-secondary/50 border border-border rounded-xl p-6">
                    <div className="flex gap-6">
                      {wikiResult.thumbnail && (
                        <img
                          src={wikiResult.thumbnail || "/placeholder.svg"}
                          alt={wikiResult.title}
                          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-2xl font-bold text-foreground">{wikiResult.title}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => setWikiResult(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{wikiResult.extract}</p>
                        <a
                          href={wikiResult.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                        >
                          Read more on Wikipedia
                          <Globe className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
