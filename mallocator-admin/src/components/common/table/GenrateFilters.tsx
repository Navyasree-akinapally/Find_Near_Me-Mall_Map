import React, { useEffect, useState } from "react";
import DropdownButton from "../dropdown/FilterDropDown";
import ContainInputFilter from "../input/containInputFilter";
import ReusableButton, { Variant } from "../buttons/Button";
import MultiSelect from "../MultiSelectList/MultiSelectList";
import DateRangeSelector from "../datePicker/datePicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
	removeAppliedFilter,
	updateFilterActiveState,
	updatePostData,
} from "../../../store/slices/tableFilter";
import "./filter.css";
import { getTimeRangeFromSelectedFilter } from "../../../Utilities/helpers";
import { getSelectedValue } from "../../../containers/GlobalFilter/helperGlobalFilter";
import { useGlobalFilter } from "../../../containers/GlobalFilter/context";

interface Filter {
	op: string;
	path: string;
	values?: { label: string; value: string }[];
	value?: { startDate: string; endDate: string };
}

interface GenrateFilterProps {
	title: string;
}

const GenrateFilter: React.FC<GenrateFilterProps> = ({ title }) => {
	const [visibleFilters, setVisibleFilters] = useState<number>(5);
	const [clearToggle, setClearToggle] = useState<any>(true);
	const dispatch = useDispatch();
	const filterValues = useSelector(
		(state: RootState) => state.tableFilterSlice[title]
	);
	const globalFilterValues = useSelector(
		(state: RootState) => state.globalFilter.filtervalue
	);
	const path: any = `${title.toLowerCase()}Filters`;
	const getFilters = useSelector(
		(state: RootState) =>
			state[path as keyof RootState]?.data?.data?.filters
	);
	const [applyClicked, setApplyClicked] = useState(false);
	const { filterData } = useGlobalFilter();

	const handleClear = (title: string, filterObj: any) => {
		let value;
		let filterName = filterObj.op + "_" + filterObj.path;
		switch (filterObj.op) {
			case "in":
				value = [];
				break;
			case "daterange":
				value = { startDate: null, endDate: null };
				break;
			case "between":
				value = { startDate: null, endDate: null };
				break;
			case "equal":
				value = "";
				break;
			case "contains":
				value = "";
				break;
			default:
				value = null;
				break;
		}
		dispatch(
			removeAppliedFilter({
				title: title,
				path: filterObj.path,
				filterName: filterName,
			})
		);
		updateFilterActiveState({
			title: title,
			path: filterObj.path,
			appliedState: false,
		});
	};

	useEffect(() => {
		applyWrapper(clearToggle, false);

		requestAnimationFrame(() => {
			setClearToggle(true);
		});
	}, [clearToggle]);

	function checkIfValidValue(value: any, op: string) {
		if (Array.isArray(value)) {
			return value.length > 0 ? true : false;
		} else if (typeof value === "string") {
			return value ? true : false;
		} else if (typeof value === "object" && op == "daterange") {
			return value ? true : false;
		}
	}

	const handleCancel = (title: string, filterObj: any) => {
		handleClear(title, filterObj);
		dispatch(
			updateFilterActiveState({
				title: title,
				path: filterObj.path,
				appliedState: false,
			})
		);
		setClearToggle(filterObj);
		setApplyClicked(true);

		requestAnimationFrame(() => {
			setApplyClicked(false);
		});
	};

	const applyWrapper = (filterObj: any, appliedState: boolean) => {
		if (filterObj === true) return;
		let temp: any = [];
		Object.keys(filterValues).map((f) => {
			if (f != "postData" && f != "getFilters") {
				const op = f.split("_")[0];
				const path = f.split("_")[1];
				checkIfValidValue(filterValues[f], op) &&
					temp.push({
						op: op,
						path: path,
						value: filterValues[f],
					});
			}
		});
		dispatch(
			updateFilterActiveState({
				title: title,
				path: filterObj.path,
				appliedState: appliedState,
			})
		);
		!temp.length
			? filterData?.table?.forEach((item: any) => {
					item.title === title &&
						dispatch(
							updatePostData({
								title: item.title,
								postData: [
									{
										op: item.op,
										path: item.path,
										value: getTimeRangeFromSelectedFilter(
											getSelectedValue(globalFilterValues)
										),
									},
								],
							})
						);
			  })
			: dispatch(updatePostData({ title: title, postData: temp }));
	};
	const handleApply = (filterObj: any, inputValue: any) => {
		setApplyClicked(true);
		applyWrapper(filterObj, true);
		const inputArray = (() => {
			if (typeof inputValue === "object" && !Array.isArray(inputValue)) {
				return Object.values(inputValue).map(String);
			}
			if (Array.isArray(inputValue)) {
				return inputValue;
			}
			return inputValue ? [inputValue] : [];
		})();
		dispatch(
			updateFilterActiveState({
				title: title,
				path: filterObj.path,
				appliedState: true,
			})
		);
		requestAnimationFrame(() => {
			setApplyClicked(false);
		});
	};

	const handleMore = () => {
		setVisibleFilters((prevVisibleFilters) => prevVisibleFilters + 1);
	};

	const buttons = [
		{
			label: "Cancel",
			action: handleCancel,
			variant: "text-primary" as Variant,
		},
		{ label: "Apply", action: handleApply, variant: "primary" as Variant },
	];

	const buttonsForMultiSelect = [
		{
			label: "Clear",
			action: handleClear,
			variant: "text-primary" as Variant,
		},
		{ label: "Apply", action: handleApply, variant: "primary" as Variant },
	];

	const renderFilter = (filter: any, index: any) => {
		switch (filter.op) {
			case "equal":
				return (
					<div key={index}>
						<DropdownButton
							clearCallback={handleCancel}
							title={title}
							isApplied={
								filterValues[filter.op + "_" + filter.path]
							}
							filterObj={filter}
							applyClicked={applyClicked}
						>
							<ContainInputFilter
								filterObj={filter}
								buttons={buttons}
								placeholder={"equal"}
								title={title}
							/>
						</DropdownButton>
					</div>
				);
			case "contains":
				return (
					<div key={index}>
						<DropdownButton
							clearCallback={handleCancel}
							title={title}
							isApplied={
								filterValues[filter.op + "_" + filter.path]
							}
							filterObj={filter}
							applyClicked={applyClicked}
						>
							<ContainInputFilter
								filterObj={filter}
								buttons={buttons}
								placeholder={"Contains"}
								title={title}
							/>
						</DropdownButton>
					</div>
				);
			case "in":
				return (
					<div key={index}>
						<DropdownButton
							clearCallback={handleCancel}
							title={title}
							isApplied={
								filterValues[filter.op + "_" + filter.path]
							}
							filterObj={filter}
							applyClicked={applyClicked}
						>
							<MultiSelect
								filterObj={filter}
								title={title}
								options={filter.value}
								buttons={buttonsForMultiSelect}
							/>
						</DropdownButton>
					</div>
				);
			case "between":
				return (
					<div key={index}>
						<DropdownButton
							clearCallback={handleCancel}
							title={title}
							isApplied={
								filterValues[filter.op + "_" + filter.path]
							}
							filterObj={filter}
							applyClicked={applyClicked}
						>
							<DateRangeSelector
								filterObj={filter}
								buttons={buttons}
								title={title}
							/>
						</DropdownButton>
					</div>
				);
			case "daterange":
				return (
					<div key={index}>
						<DropdownButton
							clearCallback={handleCancel}
							title={title}
							isApplied={
								filterValues[filter.op + "_" + filter.path]
							}
							filterObj={filter}
							applyClicked={applyClicked}
						>
							<DateRangeSelector
								filterObj={filter}
								buttons={buttons}
								title={title}
							/>
						</DropdownButton>
					</div>
				);
			default:
				return null;
		}
	};
	return (
		<div className="d-flex flex-wrap fst-italic bg-white filter-area">
			{getFilters
				?.slice(0, visibleFilters)
				.map((filter: Filter, index: number) => (
					<div className="" key={index}>
						{renderFilter(filter, index)}
					</div>
				))}
			{visibleFilters < getFilters?.length && (
				<div className=" card-toolbar d-block mx-3 my-3">
					<ReusableButton
						className="filter-button  btn-shadow"
						key={"index"}
						variant={"white"}
						onClick={handleMore}
					>
						{/* removed href from <a> for rerender issue */}
						<a className="d-flex gap-2 align-items-center">
							{
								<img
									src={"/img/plus.svg"}
									alt="React Logo"
									height={15}
								/>
							}
							<div>More Filters</div>
						</a>
					</ReusableButton>
				</div>
			)}
		</div>
	);
};

export default GenrateFilter;
