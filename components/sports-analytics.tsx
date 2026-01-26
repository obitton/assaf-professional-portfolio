"use client"

import { useState, useMemo, useEffect } from "react"
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Search, Plus, Trash2, Edit2, BarChart3, TrendingUp, PieChartIcon, Hexagon, Info, Loader2 } from "lucide-react"
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

type ChartType = "bar" | "line" | "pie" | "radar"

const CHART_COLORS = [
  "#C9A227", // Gold
  "#4A90D9", // Blue
  "#E85D75", // Red
  "#50C878", // Green
  "#9B59B6", // Purple
  "#F39C12", // Orange
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

export function SportsAnalytics() {
  const [data, setData] = useState<SportData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSport, setEditingSport] = useState<SportData | null>(null)
  const [wikiInfo, setWikiInfo] = useState<string | null>(null)
  const [loadingWiki, setLoadingWiki] = useState(false)

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
        const headers = lines[0].split(",")

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

  // Chart data for comparing countries across sports
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

  // Pie chart data for a single sport
  const pieChartData = useMemo(() => {
    if (!selectedSport) {
      const sportData = filteredData[0]
      if (!sportData) return []
      return countries.map((country) => ({
        name: COUNTRY_NAMES[country],
        value: sportData[country],
        code: country,
      }))
    }
    const sportData = filteredData.find((d) => d.sport === selectedSport)
    if (!sportData) return []
    return countries.map((country) => ({
      name: COUNTRY_NAMES[country],
      value: sportData[country],
      code: country,
    }))
  }, [filteredData, selectedSport])

  // Radar chart data for country comparison
  const radarChartData = useMemo(() => {
    return filteredData.map((item) => ({
      sport: item.sport,
      ...countries.reduce((acc, country) => ({
        ...acc,
        [COUNTRY_NAMES[country]]: item[country],
      }), {}),
    }))
  }, [filteredData])

  // Stats summary
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null

    const countryAverages = countries.map((country) => {
      const avg = filteredData.reduce((sum, item) => sum + item[country], 0) / filteredData.length
      return { country, avg: avg.toFixed(2) }
    })

    const bestPerformers = countries.map((country) => {
      const best = filteredData.reduce((best, item) =>
        item[country] < best.value ? { sport: item.sport, value: item[country] } : best
        , { sport: "", value: Infinity })
      return { country, ...best }
    })

    return { countryAverages, bestPerformers, totalSports: filteredData.length }
  }, [filteredData])

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
    setFormData({
      sport: "",
      FRA: "",
      GER: "",
      USA: "",
      CHI: "",
      RUS: "",
      JAP: "",
    })
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

  // Wikipedia API integration
  const fetchWikiInfo = async (sportName: string) => {
    setLoadingWiki(true)
    try {
      // Map sport name to Wikipedia page title, strictly following the mapping or falling back to Title Case
      const wikiPageTitle = WIKI_PAGE_MAPPING[sportName.toUpperCase()] ||
        sportName.charAt(0).toUpperCase() + sportName.slice(1).toLowerCase();

      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPageTitle)}`
      )
      if (response.ok) {
        const data = await response.json()
        setWikiInfo(data.extract || "No information available.")
      } else {
        setWikiInfo("Could not fetch information for this sport.")
      }
    } catch {
      setWikiInfo("Error fetching sport information.")
    }
    setLoadingWiki(false)
  }

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))"
                }}
              />
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))"
                }}
              />
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))"
                  }}
                />
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
                  fillOpacity={0.1}
                />
              ))}
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))"
                }}
              />
            </RadarChart>
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
      <section id="projects" className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-4 mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-primary">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Interactive Sports Analytics Tool</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            An interactive dashboard comparing international sports rankings across six countries.
            Features CRUD operations, multiple visualization types, and Wikipedia integration.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Data Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Summary */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Sports</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalSports}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Countries Tracked</p>
                  <p className="text-2xl font-bold text-primary">6</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 col-span-2">
                  <p className="text-sm text-muted-foreground mb-2">Average Rankings by Country</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.countryAverages.map(({ country, avg }) => (
                      <span key={country} className="text-xs px-2 py-1 bg-secondary rounded text-foreground">
                        {country}: {avg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chart Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                  className={chartType === "bar" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Bar
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                  className={chartType === "line" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Line
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("pie")}
                  className={chartType === "pie" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
                >
                  <PieChartIcon className="h-4 w-4 mr-1" />
                  Pie
                </Button>
                <Button
                  variant={chartType === "radar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("radar")}
                  className={chartType === "radar" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
                >
                  <Hexagon className="h-4 w-4 mr-1" />
                  Radar
                </Button>
              </div>

              {(chartType === "bar" || chartType === "line") && (
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                    <SelectValue placeholder="Select Country" />
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

            {/* Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              {renderChart()}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            {/* Search and Add */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-input border-border text-foreground"
                />
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sport
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Add New Sport</DialogTitle>
                  </DialogHeader>
                  <SportForm onSubmit={handleAdd} submitLabel="Add Sport" />
                </DialogContent>
              </Dialog>
            </div>

            {/* Data Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No sports found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item) => (
                      <TableRow key={item.id} className="border-border">
                        <TableCell className="font-medium text-foreground">{item.sport}</TableCell>
                        {countries.map((country) => (
                          <TableCell key={country} className="text-foreground text-center">
                            <span className={item[country] <= 2 ? "text-primary font-semibold" : ""}>
                              {item[country]}
                            </span>
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => fetchWikiInfo(item.sport)}
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card border-border">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground">{item.sport}</DialogTitle>
                                </DialogHeader>
                                <div className="text-muted-foreground">
                                  {loadingWiki ? (
                                    <div className="flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Loading...
                                    </div>
                                  ) : (
                                    wikiInfo
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog open={editingSport?.id === item.id} onOpenChange={(open) => !open && setEditingSport(null)}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => startEdit(item)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card border-border">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground">Edit Sport</DialogTitle>
                                </DialogHeader>
                                <SportForm onSubmit={handleUpdate} submitLabel="Update Sport" />
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Technical Note */}
        <div className="mt-12 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-3">Technical Implementation</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This interactive dashboard was originally developed as a Python application using matplotlib for visualizations
            and the Wikipedia API for contextual information. It has been converted to a React-based web application with
            Recharts for responsive charting, maintaining all original CRUD functionality while adding features like
            radar charts for multi-dimensional country comparisons and real-time filtering.
          </p>
        </div>
      </div>
    </section>
  )
}
