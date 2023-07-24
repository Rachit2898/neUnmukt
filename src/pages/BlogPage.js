import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
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
import { submit } from '../Redux/features/AuthUser';
import { getShiftReport } from '../Redux/features/User';

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
  const shiftReport = localStorage.getItem('shiftReport');
  const storedData = localStorage.getItem('data');
  const dataObject = JSON.parse(storedData);

  const navigate = useNavigate();
  const { loginData, isLogin } = useSelector((state) => ({
    ...state.auth,
  }));
  const { getShiftReportData, shiftValue, dateValue } = useSelector((state) => ({
    ...state.user,
  }));
  const values = localStorage.getItem('shiftReport');
  const shiftReportData = JSON.parse(values);

  console.log(getShiftReportData);

  const componentMapping = {
    elect_cut: 'Electricity cut',
    'c-g': 'Chipper/Grinder',
    flash_dryer_id_fans: 'Flash Dryer ID Fans',
    chipper_discahrge_to_conveyor: 'Chipper Discharge to conveyor',
    hammer_mill: 'Hammer Mill',
    hammer_mill_feeding_screw_conveyor: 'Hammer Mill Feeding Screw Conveyor',
    hammer_mill_id_fans: 'Hammer Mill ID Fans',
    dfc1_core_unit: 'DFC-1 DFC Core unit',
    dfc1_feeding_screw_conveyor: 'DFC-1 Feeding Screw Conveyor',
    dfc1_LH_side_feeding_screw_conveyor: 'DFC-1 LH-Side Feeding Screw Conveyor',
    dfc1_RH_side_feeding_screw_conveyor: 'DFC-1 RH-Side Feeding Screw Conveyor',
    dfc1_intermediate_screw_conveyor: 'DFC-1 Intermediate Screw Conveyor',
    dfc1_others: 'DFC-1 Others (like nuts, bolts etc…)',
    dfc2_core_unit: 'DFC-2 DFC Core unit',
    dfc2_feeding_screw_conveyor: 'DFC-2 Feeding Screw Conveyor',
    dfc2_LH_side_feeding_screw_conveyor: 'DFC-2 LH-Side Feeding Screw Conveyor',
    dfc2_RH_side_feeding_screw_conveyor: 'DFC-2 RH-Side Feeding Screw Conveyor',
    dfc2_intermediate_screw_conveyor: 'DFC-2 Intermediate Screw Conveyor',
    dfc2_others: 'DFC-2 Others (like nuts, bolts etc…)',
  };
  const componentMapping2 = {
    main_motor: 'Main Motor',
    grear_box: 'Gear Box',
    vbelts: 'V-Belts',
    idler: 'Idler',
    chipper_blades: 'Chipper blades',
    conveyor_belt: 'Conveyor belt',
    drive_end_bearings: 'Drive end bearings',
    non_drive_end_bearings: 'Non drive end bearings',
    pulleys: 'Pulleys',
    rotary_air_lock_valve: 'Rotary Air lock Valve',
    hammer_mill_blades: 'Hammer Mill Blades',
    dfc_ram_shaft: 'DFC Ram Shaft',
    pellet_dye: 'Pellet Dye',
    pellet_dye_holder: 'Pellet Dye Holder',
    collar: 'Collar',
    tikki: 'Tikki',
  };

  const frontendValue = componentMapping[shiftReportData[0]?.shiftBreakdownReportProd[0]?.bdComponent];
  const frontendValue2 = componentMapping2[shiftReportData[0]?.shiftBreakdownReportProd[0]?.bdComponentParts];

  console.log(frontendValue, frontendValue2);

  const dispatch = useDispatch();
  const [isDFC, setDFC] = useState(false);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [firstSelectOption, setFirstSelectOption] = useState(shiftReportData ? shiftReportData[0]?.bdComponent : '');
  const [secondSelectOption, setSecondSelectOption] = useState('');
  const [shiftIncharge, setShiftIncharge] = useState(shiftReportData ? shiftReportData[0]?.mpShiftIncharge : '');
  const [operatorsSupervisors, setOperatorsSupervisors] = useState(
    shiftReportData ? shiftReportData[0]?.mpOperatorsSupervisors : ''
  );
  const [electrician, setElectrician] = useState(shiftReportData ? shiftReportData[0]?.mpTechnicians : '');
  const [technicianMechanical, setTechnicianMechanical] = useState(
    shiftReportData ? shiftReportData[0]?.mpTractorDrivers : ''
  );
  const [laboursMale, setLaboursMale] = useState(shiftReportData ? shiftReportData[0]?.mpLabourMale : '');
  const [laboursFemale, setLaboursFemale] = useState(shiftReportData ? shiftReportData[0]?.mpLabourFemale : '');
  const [labourRelatedConcerns, setLabourRelatedConcerns] = useState(
    shiftReportData ? shiftReportData[0]?.mpLabourRelatedConcerns : null
  );
  const [otherHumanResources, setOtherHumanResources] = useState(
    shiftReportData ? shiftReportData[0]?.mpOtherHmanResources : null
  );
  const [isPlantShutdown, setIsPlantShutdown] = useState(shiftReportData ? shiftReportData[0]?.pdIsPlantShutdown : '');
  const [isPlantShutdownRemark, setIsPlantShutdownRemark] = useState('');
  const [shiftTime, setShiftTime] = useState(shiftReportData ? shiftReportData[0]?.pdShiftTime : '');
  const [plantRunningHours, setPlantRunningHours] = useState(
    shiftReportData ? shiftReportData[0]?.pdPlantRunningHours?.slice(0, 5) : ''
  );
  const [cgRunningHours, setCgRunningHours] = useState(
    shiftReportData ? shiftReportData[0]?.pdCgRunningHours?.slice(0, 5) : ''
  );
  const [dfc1RunningHours, setDfc1RunningHours] = useState(
    shiftReportData ? shiftReportData[0]?.pdDfc1RunningHours?.slice(0, 5) : ''
  );
  const [dfc2RunningHours, setDfc2RunningHours] = useState(
    shiftReportData ? shiftReportData[0]?.pdDfc2RunningHours?.slice(0, 5) : ''
  );
  const [totalDelayHours, setTotalDelayHours] = useState(
    shiftReportData ? shiftReportData[0]?.pdTotalDelayHours?.slice(0, 5) : ''
  );
  const [tonsPerShift, setTonsPerShift] = useState(shiftReportData ? shiftReportData[0]?.pdTonsPerShift : '');
  const [tonsPerShiftRemark, setTonsPerShiftRemark] = useState('');
  const [breakdown, setBreakdown] = useState();
  const [twoBoxes, setTwoBoxes] = useState(false);
  const [age, setAge] = React.useState(frontendValue);
  const [age2, setAge2] = useState(frontendValue2);
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

  useEffect(() => {
    if (!!dateValue && !!shiftValue) {
      if (typeof dateValue === 'string') {
        const [days, months, years] = dateValue.split('/');
        const newDate = new Date(`${years}-${months}-${days}`);
        const newYear = newDate.getFullYear();
        const newMonth = String(newDate.getMonth() + 1).padStart(2, '0');
        const newDay = String(newDate.getDate()).padStart(2, '0');
        const newDateFormat = `${newYear}-${newMonth}-${newDay}`;

        dispatch(getShiftReport({ shiftValue, newDateFormat }));
      }
    }
  }, [shiftValue, dateValue]);

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

  const handleSecondSelect = (selectedValue) => {
    setAge2(selectedValue);

    if (selectedValue === 'Gear Box') {
      setSecondSelectOption('grear_box');
    } else if (selectedValue === 'V-Belts') {
      secondSelectOption('vbelts');
    } else if (selectedValue === 'Idler') {
      secondSelectOption('idler');
    } else if (selectedValue === 'Chipper blades') {
      secondSelectOption('chipper_blades');
    } else if (selectedValue === 'Conveyor belt') {
      secondSelectOption('conveyor_belt');
    } else if (selectedValue === 'Drive end bearings') {
      secondSelectOption('drive_end_bearings');
    } else if (selectedValue === 'Non drive end bearings') {
      secondSelectOption('non_drive_end_bearings');
    } else if (selectedValue === 'Pulleys') {
      secondSelectOption('pulleys');
    } else if (selectedValue === 'Rotary Air lock Valve') {
      secondSelectOption('rotary_air_lock_valve');
    } else if (selectedValue === 'Hammer Mill Blades') {
      secondSelectOption('hammer_mill_blades');
    } else if (selectedValue === 'DFC Ram Shaft') {
      secondSelectOption('dfc_ram_shaft');
    } else if (selectedValue === 'Pellet Dye') {
      secondSelectOption('pellet_dye');
    } else if (selectedValue === 'Pellet Dye Holder') {
      secondSelectOption('pellet_dye_holder');
    } else if (selectedValue === 'Collar') {
      secondSelectOption('collar');
    } else if (selectedValue === 'Tikki') {
      secondSelectOption('tikki');
    } else {
      secondSelectOption('');
    }
  };

  const handleFirstSelect = (selectedValue) => {
    setAge(selectedValue);
    setSecondSelectOptions([]);

    setSecondSelectOptions([]);

    if (selectedValue === 'Electricity cut') {
      setTwoBoxes(true);
      setFirstSelectOption('elect_cut');
    } else if (selectedValue === 'Chipper/Grinder') {
      setTwoBoxes(false);
      setSecondSelectOptions(chipperGrinderOptions);
      setFirstSelectOption('c-g');
    } else if (selectedValue === 'Flash Dryer ID Fans') {
      setTwoBoxes(false);
      setSecondSelectOptions(flashDryerIDFans);
      setFirstSelectOption('flash_dryer_id_fans');
    } else if (selectedValue === 'Chipper Discharge to conveyor') {
      setTwoBoxes(false);
      setSecondSelectOptions(chipperConveyor);
      setFirstSelectOption('chipper_discahrge_to_conveyor');
    } else if (selectedValue === 'Hammer Mill') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerMill);
      setFirstSelectOption('hammer_mill');
    } else if (selectedValue === 'Hammer Mill Feeding Screw Conveyor') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerConveyor);
      setFirstSelectOption('hammer_mill_feeding_screw_conveyor');
    } else if (selectedValue === 'Hammer Mill ID Fans') {
      setTwoBoxes(false);
      setSecondSelectOptions(hammerFans);
      setFirstSelectOption('hammer_mill_id_fans');
    } else if (selectedValue === 'DFC-1 DFC Core unit') {
      setSecondSelectOptions(dFCunit);
      setFirstSelectOption('dfc1_core_unit');
      setTwoBoxes(false);
    } else if (selectedValue === 'DFC-1 Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-1 LH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_LH_side_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-1 RH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_RH_side_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-1 Intermediate Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_intermediate_screw_conveyor');
    } else if (selectedValue === 'DFC-1 Others (like nuts,bolts etc…)') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc1_others');
    } else if (selectedValue === 'DFC-2 DFC Core unit') {
      setSecondSelectOptions(dFCunit);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_core_unit');
    } else if (selectedValue === 'DFC-2 Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-2 LH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_LH_side_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-2 RH-Side Feeding Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_RH_side_feeding_screw_conveyor');
    } else if (selectedValue === 'DFC-2 Intermediate Screw Conveyor') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_intermediate_screw_conveyor');
    } else if (selectedValue === 'DFC-2 Others (like nuts,bolts etc…)') {
      setSecondSelectOptions(feedingConveyor);
      setTwoBoxes(false);
      setFirstSelectOption('dfc2_others');
    } else {
      setSecondSelectOptions([]);
    }
  };

  useEffect(() => {
    if (!!frontendValue) {
      handleFirstSelect(frontendValue);
    }
    if (!!frontendValue2) {
      handleSecondSelect(frontendValue2);
    }
    console.log(frontendValue2);
    //
  }, [frontendValue, frontendValue2]);

  const onChangeRadio = () => {
    // value will be item value
  };

  const [selectedValue, setSelectedValue] = useState();

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
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

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = [year, month, day];

  const data = {
    reportingDate: formattedDate,
    shiftName: shiftValue,
    reportedBy: dataObject?.userName,
    mpShiftIncharge: shiftIncharge,
    mpOperatorsSupervisors: operatorsSupervisors,
    mpTechnicians: electrician,
    mpTractorDrivers: technicianMechanical,
    mpLabourMale: laboursMale,
    mpLabourFemale: laboursFemale,
    mpLabourRelatedConcerns: labourRelatedConcerns,
    mpOtherHmanResources: otherHumanResources,
    pdIsPlantShutdown: selectedValue === 'yes' ? 'Y' : 'N',
    pdShiftTime: shiftTime,
    pdPlantRunningHours: plantRunningHours ? `${plantRunningHours}:00` : '00:00:00',
    pdCgRunningHours: cgRunningHours ? `${cgRunningHours}:00` : '00:00:00',
    pdDfc1RunningHours: dfc1RunningHours ? `${dfc1RunningHours}:00` : '00:00:00',
    pdDfc2RunningHours: dfc2RunningHours ? `${dfc2RunningHours}:00` : '00:00:00',
    pdTotalDelayHours: totalDelayHours ? `${totalDelayHours}:00` : '00:00:00',
    pdTonsPerShift: tonsPerShift,
    orgUnitId: 1,
    tenantId: 'Test',
    shiftBreakdownReportProd: [
      {
        bdComponent: firstSelectOption,
        bdComponentParts: secondSelectOption,
        delayTime: totalDelayHours ? `${totalDelayHours}:00` : '00:00:00',
        freeText: 'not working properly',
        orgUnitId: 1,
        tenantId: 'Test',
      },
    ],
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

    dispatch(submit({ body: data }));
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin]);

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

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Is Plant shutdown?:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                {console.log(selectedValue)}
                <RadioGroup value={selectedValue} onChange={handleRadioChange} style={{ flexDirection: 'row' }}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" style={{ marginRight: 20 }} />
                  {/* Add margin-right to create space between Radio buttons */}
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                {' '}
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  value={isPlantShutdownRemark}
                  onChange={(e) => setIsPlantShutdownRemark(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Shift time::</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={shiftTime}
                  onChange={(e) => setShiftTime(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Plant Running hours:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder="HH:MM"
                  value={plantRunningHours}
                  onChange={(e) => setPlantRunningHours(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>C/G Running Hours:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
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
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>DFC-1 Running Hours:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
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
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>DFC-2 Running Hours:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
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
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Total Delay Hours:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
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
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={12} md={3}>
                <header style={{ fontWeight: 'bold', marginBottom: 10 }}>Tons per shift:</header>
              </Grid>
              <Grid item xs={12} md={8} style={{ marginBottom: 10 }}>
                <TextField
                  fullWidth
                  size="large"
                  type="text"
                  placeholder=""
                  value={tonsPerShift}
                  onChange={(e) => setTonsPerShift(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              {' '}
            </Grid>
          </Grid>

          <Grid container style={{ justifyContent: 'space-around' }}>
            <Grid item xs={12} md={1.8}>
              <header style={{ marginBottom: 10, fontWeight: 'bold', paddingLeft: 10 }}>Breakdown:</header>
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
                  <Select value={age2} onChange={handleSecondSelectChange} fullWidth size="large">
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
