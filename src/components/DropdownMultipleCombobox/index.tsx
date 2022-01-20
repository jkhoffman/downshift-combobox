import React, { useEffect, useMemo, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import {
  StyledButton,
  StyledCombobox,
  StyledInput,
  StyledInputWrapper,
  StyledMenuItem,
  StyledMenuMultiple,
  StyledSelectedItem,
  StyledSelectedItemIcon,
} from "./styled";

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={16}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
    transform={isOpen ? "rotate(180)" : undefined}
  >
    <path d="M1,6 L10,15 L19,6" />
  </svg>
);

export interface DropdownMultipleComboboxProps {
  items: any[];
  isOpenAfterSelection?: boolean;
  width?: string | number;
  onChange?: (selectedItems: any[]) => void;
  initialSelectedItems?: any[];
}

export const DropdownMultipleCombobox: React.FC<
  DropdownMultipleComboboxProps
> = ({
  items,
  isOpenAfterSelection = false,
  width = "100%",
  onChange,
  initialSelectedItems,
}) => {
  const [inputValue, setInputValue] = useState("");

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems });

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          selectedItems.indexOf(item) < 0 &&
          item.toLowerCase().startsWith(inputValue.toLowerCase())
      ),
    [inputValue, selectedItems, items]
  );

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: filteredItems,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: isOpenAfterSelection,
          };
      }
      return changes;
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue ?? "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  useEffect(() => {
    onChange?.(selectedItems);
  }, [onChange, selectedItems]);

  return (
    <div style={{ width, position: "relative" }}>
      <StyledCombobox {...getComboboxProps()} isOpen={isOpen}>
        <StyledInputWrapper>
          {selectedItems.map((selectedItem, index) => (
            <StyledSelectedItem
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
            >
              {selectedItem}
              <StyledSelectedItemIcon
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItem);
                }}
              >
                &#10005;
              </StyledSelectedItemIcon>
            </StyledSelectedItem>
          ))}
          <StyledInput
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        </StyledInputWrapper>
        <StyledButton {...getToggleButtonProps()} aria-label={"toggle menu"}>
          <ArrowIcon isOpen={isOpen} />
        </StyledButton>
      </StyledCombobox>
      <StyledMenuMultiple {...getMenuProps()}>
        {isOpen &&
          filteredItems.map((item, index) => (
            <StyledMenuItem
              key={`${item}${index}`}
              isActive={highlightedIndex === index}
              {...getItemProps({
                item,
                index,
                isSelected: selectedItems.includes(item),
              })}
            >
              {item}
            </StyledMenuItem>
          ))}
      </StyledMenuMultiple>
    </div>
  );
};
