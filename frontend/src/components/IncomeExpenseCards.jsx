import { useDashboardContext } from "../context/DashboardContext";
import illustrationcards from "../images/illustration-cards.svg";
import { useTranslation } from "react-i18next";

export default function IncomeExpenseCards() {
  const { transactions } = useDashboardContext();
  const { t, i18n } = useTranslation();

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-[#025963f8]">
          {t("dashboardPage.cardIE.income")}
        </p>
        <h3 className="text-xl font-bold text-black">{income.toFixed(2)} €</h3>
        <img
          src={illustrationcards}
          alt="illustration card"
          className="absolute bottom-4 right-7 w-14 h-14 opacity-70"
        />
      </div>

      <div className="relative bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-[#00d57d]">
          {t("dashboardPage.cardIE.expense")}
        </p>
        <h3 className="text-xl font-bold text-black">{expense.toFixed(2)} €</h3>
        <img
          src={illustrationcards}
          alt="illustration card"
          className="absolute bottom-4 right-7 w-14 h-14 opacity-70"
        />
      </div>
    </div>
  );
}
