import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserHomePage() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="min-h-screen p-4">
      <Nav
        items={[
          { href: "/", label: "Welcome"},
          { href: "/userhomepage", label: "Home"},
          { href: "/budget", label: "Budget"},
          { href: "/login", label: "Login"},
          { href: "/api/auth/signout", label: "Logout"},
        ]}
        email={session?.user?.email || undefined}
      />

      <div className="max-w-5xl mx-auto mt-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Personal Finance Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Master your spending and achieve your financial goals
          </p>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white text-xl font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Track Your Spending
                </h3>
                <p className="text-gray-600">
                  Log every purchase you make with category, amount, date, and location details to keep everything organized.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white text-xl font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Set Category Budgets
                </h3>
                <p className="text-gray-600">
                  Define spending limits for each category (groceries, gas, entertainment, etc.) and monitor your progress.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-xl font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  View Your Budget Dashboard
                </h3>
                <p className="text-gray-600">
                  See all your categories at a glance with visual progress bars showing how much you've spent vs. your budget.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-xl font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Make Informed Decisions
                </h3>
                <p className="text-gray-600">
                  Adjust your spending habits based on real data and achieve your financial goals one transaction at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-Time Tracking
            </h3>
            <p className="text-gray-600">
              Instantly see how much you've spent in each category with detailed transaction history.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Custom Budgets
            </h3>
            <p className="text-gray-600">
              Set personalized spending limits for each category and adjust them anytime.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your financial data is encrypted and stored securely. Only you can access your information.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="mb-6 text-lg">
            Start tracking your spending today and gain insights into your financial habits.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/budget"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition"
            >
              Go to Budget
            </a>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Success</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Be Consistent:</strong> Log your expenses regularly to maintain accurate spending records.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Review Weekly:</strong> Check your budget dashboard weekly to stay on track.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Adjust Budgets:</strong> If a category consistently exceeds its limit, adjust the budget or reduce spending.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Categorize Properly:</strong> Use clear, consistent category names to make analysis easier.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Set Realistic Goals:</strong> Start with achievable budget limits and gradually tighten them.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
