
export function formatDate(date: string): string {
    const dateValue = date;
    const datePrecision =
        dateValue.length === 4
            ? "year"
            : dateValue.length === 7
                ? "month-year"
                : "full";
    const dateForFormatting =
        datePrecision === "year"
            ? `${dateValue}-01-01`
            : datePrecision === "month-year"
                ? `${dateValue}-01`
                : dateValue;
    const dateOptions = {
        ...(datePrecision !== "year" && { month: "long" }),
        ...(datePrecision === "full" && { day: "numeric" }),
        year: "numeric",
        timeZone: "UTC",
    } as Intl.DateTimeFormatOptions;
    return new Intl.DateTimeFormat("fr-FR", dateOptions).format(
        new Date(`${dateForFormatting}T00:00:00Z`),
    );
}