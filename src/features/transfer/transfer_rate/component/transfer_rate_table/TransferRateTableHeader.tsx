import React from "react";
import { Form, InputGroup } from "react-bootstrap"
import { FaAsterisk, FaSearch } from "react-icons/fa"
import SourceAreaInput from "../../../transfer_childrenpolicy/component/filterinputs/SourceAreaInput"
import FilterInput from "../../../transfer_childrenpolicy/component/filterinputs/FilterInput"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import {changeFilter, selectFilters} from "../../states/transferRateSlice"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"

const TransferRateTableHeader: React.FC = () => {

    const filters = useAppSelector(selectFilters)
    const dispatch = useAppDispatch();


    const onFilterChange = ({key,value}:{key:string,value:string | null})=>{
    dispatch(changeFilter({ key: key, value: value }))

  }

  return (
    <thead>
    <tr>
      <th>#</th>
      <th className="" >
        <div>
          Source Area
          <FilterInput
            value={filters.sourceArea}
            placeholder="Filter by Source"
            type="text"
            onSubmit={onFilterChange}
            inputKey="sourceArea"
          />
        </div>
      </th>
      <th className="">
        <div>
          Destination Area
          <FilterInput
            value={filters.destinationArea}
            placeholder="Filter by Destination"
            type="text"
            onSubmit={onFilterChange}
            inputKey="destinationArea"
          />
        </div>
      </th>
      <th className="">
        <div>
          Rate Per Person
          <FilterInput
            value={filters.ratePerPerson}
            placeholder="Filter by Rate"
            type="text"
            onSubmit={onFilterChange}
            inputKey="ratePerPerson"
          />
        </div>
      </th>
      <th className="">
        <div>
          Release
          <FilterInput
            value={filters.release}
            placeholder="Filter by release"
            type="text"
            onSubmit={onFilterChange}
            inputKey="release"
          />
        </div>
      </th>
      <th className="">
        <div>
          Created At
          <FilterInput
            value={filters.createdAt}
            placeholder="Filter by Date"
            type="date"
            onSubmit={onFilterChange}
            inputKey="createdAt"
          />
        </div>
      </th>
      <th className="">
        <div>
          Active
          <InputGroup className="mt-2">
            <Form.Select
              value={
                filters.isActive === "true"
                  ? "true"
                  : filters.isActive === "false"
                    ? "false"
                    : "all"
              }
              onChange={e => {
                onFilterChange({
                  key: "isActive",
                  value: e.target.value === "all" ? null : e.target.value,
                })
              }}
            >
              <option value="all">★</option>
              <option value="true">✔️</option>
              <option value="false">❌</option>
            </Form.Select>
          </InputGroup>
        </div>
      </th>
    </tr>
    </thead>
  )
};

export default TransferRateTableHeader;