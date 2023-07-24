import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import TextField from '@mui/material/TextField';

import styled from '@emotion/styled';

const CustomSelect = styled(Select)`
  margin-bottom: 10px;
`;
// components

// ----------------------------------------------------------------------

const positionOptions = [
  { label: 'Electricity cut', value: 'Electricity cut' },
  { value: 'Chipper/Grinder', label: 'Chipper/Grinder' },
  { value: 'Flash Dryer ID Fans', label: 'Flash Dryer ID Fans' },
  {
    value: 'Chipper Discharge to conveyor',
    label: 'Chipper Discharge to conveyor',
  },
  { value: 'Hammer Mill', label: 'Hammer Mill' },
  { value: 'Conveyor belt', label: 'Conveyor belt' },
  {
    value: 'Hammer Mill Feeding Screw Conveyor',
    label: 'Hammer Mill Feeding Screw Conveyor',
  },
  { value: 'Hammer Mill ID Fans', label: 'Hammer Mill ID Fans' },
  { value: 'DFC-1 DFC Core unit', label: 'DFC-1 DFC Core unit' },
  {
    value: 'DFC-1 Feeding Screw Conveyor',
    label: 'DFC-1 Feeding Screw Conveyor',
  },
  {
    value: 'DFC-1 LH-Side Feeding Screw Conveyor',
    label: 'DFC-1 LH-Side Feeding Screw Conveyor',
  },
  {
    value: 'DFC-1 RH-Side Feeding Screw Conveyor',
    label: 'DFC-1 RH-Side Feeding Screw Conveyor',
  },
  {
    value: 'DFC-1 Intermediate Screw Conveyor',
    label: 'DFC-1 Intermediate Screw Conveyor',
  },
  {
    value: 'DFC-1 Others (like nuts,bolts etc…)',
    label: 'DFC-1 Others (like nuts,bolts etc…)',
  },
  { value: 'DFC-2 DFC Core unit', label: 'DFC-2 DFC Core unit' },
  {
    value: 'DFC-2 Feeding Screw Conveyor',
    label: 'DFC-2 Feeding Screw Conveyor',
  },
  {
    value: 'DFC-2 LH-Side Feeding Screw Conveyor',
    label: 'DFC-2 LH-Side Feeding Screw Conveyor',
  },
  {
    value: 'DFC-2 RH-Side Feeding Screw Conveyor',
    label: 'DFC-2 RH-Side Feeding Screw Conveyor',
  },
  {
    value: 'DFC-2 Intermediate Screw Conveyor',
    label: 'DFC-2 Intermediate Screw Conveyor',
  },
  {
    value: 'DFC-2 Others (like nuts,bolts etc…)',
    label: 'DFC-2 Others (like nuts,bolts etc…)',
  },
];

const flashDryerIDFans = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'V- Belts', label: 'V- Belts' },
  { value: 'Pulleys', label: 'Pulleys' },
  { value: 'Rotary Air lock Valve', label: 'Rotary Air lock Valve' },
];

const chipperConveyor = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Gear Box', label: 'Gear Box' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Drive end bearings', label: 'Drive end bearings' },
  { value: 'Non drive end bearings', label: 'Non drive end bearings' },
];

const hammerMill = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Gear Box', label: 'Gear Box' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Drive end bearings', label: 'Drive end bearings' },
  { value: 'Non drive end bearings', label: 'Non drive end bearings' },
];
const hammerConveyor = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Gear Box', label: 'Gear Box' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Drive end bearings', label: 'Drive end bearings' },
  { value: 'Non drive end bearings', label: 'Non drive end bearings' },
];

const hammerFans = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Pulleys', label: 'Pulleys' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Rotary Air lock Valve', label: 'Rotary Air lock Valve' },
];

const dFCunit = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Gear Box', label: 'Gear Box' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Drive end bearings', label: 'Drive end bearings' },
  { value: 'Non drive end bearings', label: 'Non drive end bearings' },
  { value: 'DFC Ram Shaft', label: 'DFC Ram Shaft' },
  { value: 'Pellet Dye', label: 'Pellet Dye' },
  { value: 'Pellet Dye Holder', label: 'Pellet Dye Holder' },
  { value: 'Collar', label: 'Collar' },
  { value: 'Tikki', label: 'Tikki' },
];

const dfc1 = [
  { value: 'DFC Core unit', label: 'DFC Core unit' },
  { value: 'Feeding Screw Conveyor', label: 'DFC Feeding Screw Conveyor' },
  {
    value: 'LH-Side Feeding Screw Conveyor',
    label: 'LH-Side Feeding Screw Conveyor',
  },
  {
    value: 'RH-Side Feeding Screw Conveyor',
    label: 'RH-Side Feeding Screw Conveyor',
  },
  {
    value: 'Intermediate Screw Conveyor',
    label: 'Intermediate Screw Conveyor',
  },
  {
    value: 'Others (like nuts,bolts etc…)',
    label: 'Others (like nuts,bolts etc…)',
  },
];

const feedingConveyor = [
  { label: 'Main Motor', value: 'Main Motor' },
  { value: 'Gear Box', label: 'Gear Box' },
  { value: 'V-Belts', label: 'V-Belts' },
  { value: 'Drive end bearings', label: 'Drive end bearings' },
  { value: 'Non drive end bearings', label: 'Non drive end bearings' },
];

export default function DashboardAppPage() {
  const [isDFC, setDFC] = useState(false);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [firstSelectOption, setFirstSelectOption] = useState('');
  const [secondSelectOption, setSecondSelectOption] = useState('');

  const [shiftIncharge, setShiftIncharge] = useState('');
  const [shiftInchargeRemark, setShiftInchargeRemark] = useState('');

  const [operatorsSupervisors, setOperatorsSupervisors] = useState('');
  const [operatorsSupervisorsRemark, setOperatorsSupervisorsRemark] = useState('');

  const [electrician, setElectrician] = useState('');
  const [electricianRemark, setElectricianRemark] = useState('');

  const [technicianMechanical, setTechnicianMechanical] = useState('');
  const [technicianMechanicalRemark, setTechnicianMechanicalRemark] = useState('');

  const [laboursMale, setLaboursMale] = useState('');
  const [laboursMaleRemark, setLaboursMaleRemark] = useState('');

  const [laboursFemale, setLaboursFemale] = useState('');
  const [laboursFemaleRemark, setLaboursFemaleRemark] = useState('');

  const [labourRelatedConcerns, setLabourRelatedConcerns] = useState('');
  const [labourRelatedConcernsRemark, setLabourRelatedConcernsRemark] = useState('');

  const [otherHumanResources, setOtherHumanResources] = useState('');
  const [otherHumanResourcesRemark, setOtherHumanResourcesRemark] = useState('');

  const [isPlantShutdown, setIsPlantShutdown] = useState('Yes');
  const [isPlantShutdownRemark, setIsPlantShutdownRemark] = useState('');

  const [shiftTime, setShiftTime] = useState('');
  const [shiftTimeRemark, setShiftTimeRemark] = useState('');

  const [plantRunningHours, setPlantRunningHours] = useState('');
  const [plantRunningHoursRemark, setPlantRunningHoursRemark] = useState('');

  const [cgRunningHours, setCgRunningHours] = useState('');
  const [cgRunningHoursRemark, setCgRunningHoursRemark] = useState('');

  const [dfc1RunningHours, setDfc1RunningHours] = useState('');
  const [dfc1RunningHoursRemark, setDfc1RunningHoursRemark] = useState('');

  const [dfc2RunningHours, setDfc2RunningHours] = useState('');
  const [dfc2RunningHoursRemark, setDfc2RunningHoursRemark] = useState('');

  const [totalDelayHours, setTotalDelayHours] = useState('');
  const [totalDelayHoursRemark, setTotalDelayHoursRemark] = useState('');

  const [tonsPerShift, setTonsPerShift] = useState('');
  const [tonsPerShiftRemark, setTonsPerShiftRemark] = useState('');

  const [breakdown, setBreakdown] = useState('');
  const [breakdownRemark, setBreakdownRemark] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [twoBoxes, setTwoBoxes] = useState(false);

  const [selectedOption, setSelectedOption] = useState(''); // Add state to handle selected option
  const [age, setAge] = React.useState('');

  const [age2, setAge2] = React.useState('');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const chipperGrinderOptions = [
    { label: 'Main Motor', value: 'Main Motor' },
    { value: 'Gear Box', label: 'Gear Box' },
    { value: 'V-Belts', label: 'V-Belts' },
    { value: 'Idler', label: 'Idler' },
    { value: 'Chipper blades', label: 'Chipper blades' },
    { value: 'Conveyor belt', label: 'Conveyor belt' },
    { value: 'Drive end bearings', label: 'Drive end bearings' },
    { value: 'Non drive end bearings', label: 'Non drive end bearings' },
  ];

  const handleFirstSelectChange = (event) => {
    setAge(event.target.value);
    const selectedValue = event.target;

    setSecondSelectOptions([]);

    if (selectedValue?.value === 'Electricity cut') {
      setTwoBoxes(true);
      setFirstSelectOption('elect_cut');
    } else if (selectedValue?.value === 'Chipper/Grinder') {
      setTwoBoxes(false);
      setSecondSelectOptions(chipperGrinderOptions);
      setFirstSelectOption('c-g');
    } else if (selectedValue?.value === 'Flash Dryer ID Fans') {
      setTwoBoxes(false);
      setSecondSelectOptions(flashDryerIDFans);
      setFirstSelectOption('flash_dryer_id_fans');
    } else if (selectedValue?.value === 'Chipper Discharge to conveyor') {
      setTwoBoxes(false);
      setSecondSelectOptions(chipperConveyor);
      setFirstSelectOption('chipper_discahrge_to_conveyor');
    } else if (selectedValue?.value === 'Hammer Mill') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerMill);
      setFirstSelectOption('hammer_mill');
    } else if (selectedValue?.value === 'Hammer Mill Feeding Screw Conveyor') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerConveyor);
      setFirstSelectOption('hammer_mill_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'Hammer Mill ID Fans') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerFans);
      setFirstSelectOption('hammer_mill_id_fans');
    } else if (selectedValue?.value === 'DFC-1 DFC Core unit') {
      setSecondSelectOptions(dFCunit);
      setFirstSelectOption('dfc1_core_unit');
      setTwoBoxes(false);
    } else if (selectedValue?.value === 'DFC-1 Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-1 LH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_LH_side_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-1 RH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_RH_side_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-1 Intermediate Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_intermediate_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-1 Others (like nuts,bolts etc…)') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_others');
    } else if (selectedValue?.value === 'DFC-2 DFC Core unit') {
      setSecondSelectOptions(dFCunit);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_core_unit');
    } else if (selectedValue?.value === 'DFC-2 Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-2 LH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_LH_side_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-2 RH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_RH_side_feeding_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-2 Intermediate Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_intermediate_screw_conveyor');
    } else if (selectedValue?.value === 'DFC-2 Others (like nuts,bolts etc…)') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_others');
    } else {
      setSecondSelectOptions([]);
    }
  };

  const handleSecondSelectChange = (event) => {
    const selectedValue = event.target;
    setAge2(event.target.value);

    if (selectedValue?.value === 'Gear Box') {
      setSecondSelectOption('grear_box');
    } else if (selectedValue?.value === 'V-Belts') {
      secondSelectOption('vbelts');
    } else if (selectedValue?.value === 'Idler') {
      secondSelectOption('idler');
    } else if (selectedValue?.value === 'Chipper blades') {
      secondSelectOption('chipper_blades');
    } else if (selectedValue?.value === 'Conveyor belt') {
      secondSelectOption('conveyor_belt');
    } else if (selectedValue?.value === 'Drive end bearings') {
      secondSelectOption('drive_end_bearings');
    } else if (selectedValue?.value === 'Non drive end bearings') {
      secondSelectOption('non_drive_end_bearings');
    } else if (selectedValue?.value === 'Pulleys') {
      secondSelectOption('pulleys');
    } else if (selectedValue?.value === 'Rotary Air lock Valve') {
      secondSelectOption('rotary_air_lock_valve');
    } else if (selectedValue?.value === 'Hammer Mill Blades') {
      secondSelectOption('hammer_mill_blades');
    } else if (selectedValue?.value === 'DFC Ram Shaft') {
      secondSelectOption('dfc_ram_shaft');
    } else if (selectedValue?.value === 'Pellet Dye') {
      secondSelectOption('pellet_dye');
    } else if (selectedValue?.value === 'Pellet Dye Holder') {
      secondSelectOption('pellet_dye_holder');
    } else if (selectedValue?.value === 'Collar') {
      secondSelectOption('collar');
    } else if (selectedValue?.value === 'Tikki') {
      secondSelectOption('tikki');
    }
  };

  const onChangeRadio = () => {
    // value will be item value
  };

  const [selectedValue, setSelectedValue] = useState(''); // State to hold the selected option

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected option when the user clicks on a radio button
  };
  const [isValid, setIsValid] = useState(false);
  const [isValid2, setIsValid2] = useState(false);
  const [isValid3, setIsValid3] = useState(false);
  const [isValid4, setIsValid4] = useState(false);
  const [isValid5, setIsValid5] = useState(false);
  const clearText = () => {
    setIsValid(false);
    setIsValid2(false);
    setIsValid3(false);
    setIsValid4(false);
    setIsValid5(false);
  };

  const handlePlantRunningHoursChange = (e) => {
    clearText();
    setPlantRunningHours(e.target.value);
  };

  const handleCgRunningHours = (e) => {
    clearText();
    setCgRunningHours(e.target.value);
  };

  const handleDfc1RunningHours = (e) => {
    clearText();
    setDfc1RunningHours(e.target.value);
  };
  const handleDfc2RunningHours = (e) => {
    clearText();
    setDfc2RunningHours(e.target.value);
  };

  const handleDelayHours = (e) => {
    clearText();
    setTotalDelayHours(e.target.value);
  };

  const handleInputChange = (e) => {
    const input = e;

    const formattedInput = input.replace(/[^\d:]/g, '');

    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    const valid = regex.test(formattedInput) || formattedInput === '';

    return valid;
  };

  const handleSubmit = () => {
    const plantValid = handleInputChange(plantRunningHours);
    if (!plantValid) {
      setIsValid(true);
    }
    const cgValid = handleInputChange(cgRunningHours);
    if (!cgValid) {
      setIsValid2(true);
    }
    const dfc1Valid = handleInputChange(dfc1RunningHours);
    if (!dfc1Valid) {
      setIsValid3(true);
    }
    const dfc2Valid = handleInputChange(dfc2RunningHours);
    if (!dfc2Valid) {
      setIsValid4(true);
    }
    const totalValid = handleInputChange(totalDelayHours);
    if (!totalValid) {
      setIsValid5(true);
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Man Power
          </Typography>

          <Grid container style={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Shift Incharge:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={shiftIncharge}
                  onChange={(e) => setShiftIncharge(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  Operators/Supervisors:
                </header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={operatorsSupervisors}
                  onChange={(e) => setOperatorsSupervisors(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Electrician:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={electrician}
                  onChange={(e) => setElectrician(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Technician/Mechanical:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={technicianMechanical}
                  onChange={(e) => setTechnicianMechanical(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Labours - Male:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={laboursMale}
                  onChange={(e) => setLaboursMale(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Labours - Female:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={laboursFemale}
                  onChange={(e) => setLaboursFemale(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Labour related concerns:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={labourRelatedConcerns}
                  onChange={(e) => setLabourRelatedConcerns(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Other Human Resources:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={otherHumanResources}
                  onChange={(e) => setOtherHumanResources(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ borderStyle: 'dashed', mt: 5 }} />
          <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
            Production Details
          </Typography>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Is Plant shutdown?:</header>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              container // Set the container attribute to true to use Grid as a flex container
              style={{ marginBottom: 10, flexDirection: 'row', display: 'flex' }} // Set the flexDirection to 'row' and display to 'flex'
            >
              <RadioGroup value={selectedValue} onChange={handleRadioChange} style={{ flexDirection: 'row' }}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ marginRight: 20 }} />{' '}
                {/* Add margin-right to create space between Radio buttons */}
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={shiftInchargeRemark}
                onChange={(e) => setShiftInchargeRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Shift time::</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder=""
                value={shiftTime}
                onChange={(e) => setShiftTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={shiftTimeRemark}
                onChange={(e) => setShiftTimeRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Plant Running hours:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="HH:MM"
                value={plantRunningHours}
                onChange={(e) => {
                  handlePlantRunningHoursChange(e);
                }}
                error={isValid}
                helperText={isValid ? 'Invalid format. Use HH:MM format.' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={plantRunningHoursRemark}
                onChange={(e) => setPlantRunningHoursRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>C/G Running Hours:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="HH:MM"
                value={cgRunningHours}
                onChange={(e) => handleCgRunningHours(e)}
                error={isValid2}
                helperText={isValid2 ? 'Invalid format. Use HH:MM format.' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={cgRunningHoursRemark}
                onChange={(e) => setCgRunningHoursRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>DFC-1 Running Hours:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="HH:MM"
                value={dfc1RunningHours}
                onChange={(e) => handleDfc1RunningHours(e)}
                error={isValid3}
                helperText={isValid3 ? 'Invalid format. Use HH:MM format.' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={dfc1RunningHoursRemark}
                onChange={(e) => setDfc1RunningHoursRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>DFC-2 Running Hours:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="HH:MM"
                value={dfc2RunningHours}
                onChange={(e) => handleDfc2RunningHours(e)}
                error={isValid4}
                helperText={isValid4 ? 'Invalid format. Use HH:MM format.' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={dfc2RunningHoursRemark}
                onChange={(e) => setDfc2RunningHoursRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Total Delay Hours:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="HH:MM"
                value={totalDelayHours}
                onChange={(e) => handleDelayHours(e)}
                error={isValid5}
                helperText={isValid5 ? 'Invalid format. Use HH:MM format.' : ''}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={totalDelayHoursRemark}
                onChange={(e) => setTotalDelayHoursRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.5}>
              <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Tons per shift:</header>
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder=""
                value={tonsPerShift}
                onChange={(e) => setTonsPerShift(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={5} style={{ marginBottom: 10 }}>
              <TextField
                fullWidth
                size="large"
                type="text"
                placeholder="Remark"
                value={tonsPerShiftRemark}
                onChange={(e) => setTonsPerShiftRemark(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={1.6}>
              <header style={{ marginBottom: 10, fontWeight: 'bold' }}>Breakdown:</header>
            </Grid>

            {!twoBoxes ? (
              <>
                <Grid item xs={12} md={2.5} style={{ marginBottom: 10 }}>
                  <FormControl fullWidth>
                    <Select value={age} onChange={handleFirstSelectChange}>
                      {positionOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2.5} style={{ marginBottom: 10 }}>
                  <Select value={age2} onChange={handleSecondSelectChange} multiple fullWidth size="large">
                    {secondSelectOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={2.5} style={{ marginBottom: 10 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="large"
                    label=""
                    placeholder=""
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2.5} style={{ marginBottom: 10 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="large"
                    label=""
                    placeholder=""
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={3} style={{ marginBottom: 10 }}>
                  <Select value={age} onChange={handleFirstSelectChange} fullWidth>
                    {positionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={3.5} style={{ marginBottom: 10 }}>
                  <TextField
                    fullWidth
                    size="large"
                    type="text"
                    placeholder=""
                    value={tonsPerShift}
                    onChange={(e) => setTonsPerShift(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} style={{ marginBottom: 10 }}>
                  <TextField
                    fullWidth
                    size="large"
                    type="text"
                    placeholder="Remark"
                    value={tonsPerShiftRemark}
                    onChange={(e) => setTonsPerShiftRemark(e.target.value)}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Button
                onClick={() => handleSubmit()}
                variant="text"
                sx={{ backgroundColor: '#007bff', color: '#fff', pl: 5, pr: 5 }}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
}
