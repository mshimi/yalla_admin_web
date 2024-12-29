 interface TransferRateFilters {
  sort: string;
  destinationArea: string | null;
  sourceArea: string | null;
  ratePerPerson: string | null;
  createdAt: string | null;
  isActive: string | null;
}



 /**
  * Converts TransferRateFilters to a Record<string, string>, removing null values.
  * @param filters The TransferRateFilters object.
  * @returns A Record<string, string> with only non-null values.
  */
 function filtersToRecord(filters: TransferRateFilters): Record<string, string> {
   // Transform the filters first
   const transformedFilters = transformFilters(filters);

   // Filter and convert to a Record<string, string>, removing null values
   return Object.entries(transformedFilters)
     .filter(([_, value]) => value !== null && value !== undefined) // Exclude entries with null or undefined values
     .reduce<Record<string, string>>(
       (acc, [key, value]) => {
         acc[key] = value as string; // Ensure values are strings
         return acc;
       },
       {}
     );
 }




 function transformFilters(filters: TransferRateFilters): Record<string, string> {
   const filterRecord: Record<string, string> = {};

   Object.entries(filters).forEach(([key, value]) => {
     if (value !== null && value !== undefined) {
       // Map destinationArea to destinationArea.name
       const transformedKey = key === "destinationArea" ? "destinationArea.areaName"  : key ==="sourceArea" ? "sourceArea.areaName" : key;
       filterRecord[transformedKey] = value;
     }
   });

   return filterRecord;
 }


 export { filtersToRecord };


export default TransferRateFilters;