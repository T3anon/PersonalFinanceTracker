import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Main landing page showing welcome message and features
export default async function UserHomePage() {
  // Get session to display user email in nav
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
            Welcome To
          </h1>
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
            What Is It?
          </h2>
          <p className="text-gray-600 text-center">
            <strong className="text-lg">Personal Finance Tracker</strong> is a tool designed to help you manage your finances effectively. Track your spending, set budgets, and make informed financial decisions.
          </p>
          <p className="text-gray-600 text-center mt-4">
            <strong className="text-lg">Take Control of Your Money.</strong> Effortlessly track your income, expenses, and savings goals in one simple place. Start budgeting smarter, not harder.
          </p>
          <p className="text-gray-600 text-center mt-4">
            <strong className="text-lg">Achieve Financial Peace.</strong> Our intuitive tracker helps you visualize where your money goes, identify spending habits, and accelerate your progress toward debt repayment and savings targets.
          </p>
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
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
