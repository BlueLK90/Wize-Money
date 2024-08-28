import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Other/customCalendar.css";
import { DropDownCalendar } from "../Other/DropDown";
import DataContext from "../../contexts/dataContext/DataContext";
import { detailsCard } from "../Other/DetailsCard";

const CalendarComponent = () => {
  const { data } = useContext(DataContext);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const calendarFilter = (selectedDate) => {
    const transactions = Object.values(data.transactionData)
      .flat()
      .filter((transaction) => {
        const transactionDate = new Date(transaction.dateAdded);
        return (
          transactionDate.getFullYear() === selectedDate.getFullYear() &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getDate() === selectedDate.getDate()
        );
      });
    return transactions;
  };
  const filteredTransactions = calendarFilter(date) || [];

  return (
    <div className="px-6 py-2">
      <Calendar
        onChange={handleDateChange}
        value={date}
        maxDate={new Date()}
        className="border-0 rounded-md p-2 text-gray-900 shadow-sm" // Header text color
        tileClassName={({ date, view }) =>
          view === "month" && date.getDate() === new Date().getDate()
            ? "bg-greentea text-gray-700 font-semibold rounded-lg"
            : "hover:bg-aprikot text-gray-900"
        }
      />
      <p className="p-2 text-gray-900">{date.toDateString()}:</p>
      <hr className="border border-t-gray-300" />
      {filteredTransactions.map((element, i) => (
        <div key={i} className={detailsCard}>
          <DropDownCalendar el={element} />
        </div>
      ))}
    </div>
  );
};

export default CalendarComponent;
