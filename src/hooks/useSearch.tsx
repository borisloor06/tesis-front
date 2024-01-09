import { useState } from "react";

const useSearch = () => {
	const [inputValue, setInputValue] = useState("");
	const handleInputChange = (event: any) => {
		setInputValue(event.target.value);
	};

	return {
		inputValue,
		handleInputChange,
	};
};

export default useSearch;
