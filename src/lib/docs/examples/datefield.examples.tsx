import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { DateField } from "@/lib/form-builder/fields/DateField/datefield.builder";

export const BasicDateFieldSchema = createSchema(
  "Basic",
  [DateField("dob").label("Date of Birth").placeholder("Select your birth date")],
  "A standard date picker for a single date"
);

export const RangeDateFieldSchema = createSchema(
  "Date Range",
  [
    DateField("eventDates")
      .label("Event Dates")
      .mode("range")
      .description("Select start and end dates")
  ],
  "A date picker for selecting a range of dates"
);

export const InputDateFieldSchema = createSchema(
  "Input datefield",
  [
    DateField("departure")
      .label("Departure Date")
      .variant("input")
      .format("long")
  ],
  "A typed date input field instead of a popover calendar"
);

export const DropdownDateFieldSchema = createSchema(
  "Dropdown Layout",
  [
    DateField("anniversary")
      .label("Anniversary")
      .captionLayout("dropdown")
      .showYearDropdown(true)
      .showMonthDropdown(true)
      .yearRange(1900, new Date().getFullYear() + 100)
  ],
  "A calendar with dropdowns for quick month/year selection"
);

export const FixedWeeksDateFieldSchema = createSchema(
  "Fixed weeks calendar",
  [
    DateField("fixedWeeksDate")
      .label("Booking Date")
      .fixedWeeks(true)
      .showOutsideDays(true)
      .description("Calendar always shows 6 weeks to prevent layout shifts")
  ],
  "A date picker that always displays 6 weeks"
);

export const DisabledDateFieldSchema = createSchema(
  "Disabled dates",
  [
    DateField("appointment")
      .label("Appointment Date")
      .disabled({ before: new Date(), dayOfWeek: [0, 6] })
  ],
  "A date picker with disabled past dates and weekends"
);
