import Image from "next/image";
import Nav from "@/components/nav";

export default function Home() {
  const budgetGroups = [
    {
      name: "Groceries",
      totalSpent: 120,
      budgetLimit: 300,
      transactions: [
        { date: "11/10/2025", place: "Walmart", amount: 45, description: "Food" },
        { date: "11/12/2025", place: "Target", amount: 75, description: "Food" },
      ],
    },
    {
      name: "Car",
      totalSpent: 140,
      budgetLimit: 250,
      transactions: [
        { date: "11/11/2025", place: "AutoZone", amount: 40, description: "Tires" },
        { date: "11/12/2025", place: "Repair Shop", amount: 100, description: "Gaskets" },
      ],
    },
    {
      name: "Entertainment",
      totalSpent: 90, 
      budgetLimit: 200, 
      transactions: [
        {date: "11/13/2025", place: "Movie Theater",amount: 30, description:"Tickets"},
        {date: "11/14/2025", place: "Spotify",amount: 10, description:"Subscription"},
        {date: "11/15/2025", place: "Bowling Alley",amount: 50, description:"Games"},
      ],
    },
    {
      name: "Utilities",
      totalSpent: 180, 
      budgetLimit: 400, 
      transactions: [
        {date: "11/10/2025", place: "Electric Company",amount: 120, description:"Electric Bill"},
        {date: "11/12/2025", place: "Water Company",amount: 60, description:"Water Bill"},
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Nav
        items={[
          { href: "/", label: "Home" },
          { href: "/budget", label: "Budget" },
          { href: "/profile", label: "Profile" },
          { href: "/login", label: "Login" },
        ]}
      />
      <h1 className="text-2xl font-bold text-center my-6">Budget Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetGroups.map((group, index) => {
          const percentUsed = Math.min(
            (group.totalSpent / group.budgetLimit) * 100,
            100
          );

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{group.name}</h2>
              <p className="text-gray-600">
                Spent: ${group.totalSpent} / ${group.budgetLimit}
              </p>

              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${percentUsed}%` }}
                />
              </div>

              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {group.transactions.map((tx, i) => (
                  <li key={i}>
                    {tx.date} — {tx.place} — ${tx.amount} ({tx.description})
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}