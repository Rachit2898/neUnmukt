import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem, Stack, IconButton, Popover, Typography, Card } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { date, shift } from '../../../Redux/features/User';

const LANGS = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'General',
    label: 'General',
  },
];

const getDateOptions = () => {
  const today = new Date();
  const previousDay = new Date();
  previousDay.setDate(today.getDate() - 1);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return [
    { value: formatDate(today), label: 'Today' },
    { value: formatDate(previousDay), label: 'Previous Day' },
  ];
};

export default function LanguagePopover() {
  const values = localStorage.getItem('shiftReport');
  const dataObject = JSON.parse(values) || [];

  useEffect(() => {
    if (dataObject.length > 0) {
      const [year, month, day] = dataObject[0]?.reportingDate || [];
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      localStorage.setItem('formatDate', formattedDate);
    }
  }, [dataObject]);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);

  // Define initial values for selectedValue and selectedDate.
  // If dataObject is empty or does not have the required properties, use default values.
  const initialShiftName = dataObject[0]?.shiftName || '';
  const initialDate = dataObject[0]?.reportingDate
    ? `${dataObject[0].reportingDate[2].toString().padStart(2, '0')}/${dataObject[0].reportingDate[1]
        .toString()
        .padStart(2, '0')}/${dataObject[0].reportingDate[0]}`
    : '';

  const [selectedShift, setSelectedShift] = useState(initialShiftName);
  const [selectedValue, setSelectedValue] = useState(initialShiftName);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
    dispatch(date(event.target.value));
  };

  const dateOptions = getDateOptions();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(shift(event.target.value));
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
    handleClose();
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedDate}
          onChange={handleChangeDate}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Select a date
          </MenuItem>
          {dateOptions.map((date) => (
            <MenuItem key={date.value} value={date.value}>
              {date.label} - {date.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          style={{ borderStyle: 'none' }}
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {!dataObject[0]?.shiftName ? (
            <MenuItem value="" disabled>
              {dataObject[0]?.shiftName ? `Shift: ${dataObject[0]?.shiftName}` : 'Select Shift'}
            </MenuItem>
          ) : null}
          {LANGS.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              Shift: {lang.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selectedShift.value} // Highlight the selected shift in the menu
              onClick={() => handleShiftSelect(option)} // Update the selected shift when a shift is clicked
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
