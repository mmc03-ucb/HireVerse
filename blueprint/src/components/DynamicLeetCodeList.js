import React, { useState } from 'react';
import { Typography, Container, TextField, Button, MenuItem, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function DynamicLeetCodeList() {
  const [interviewDate, setInterviewDate] = useState(null);  // Interview date from calendar
  const [prepLevel, setPrepLevel] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate number of days between today and the interview date
  const calculateDaysLeft = () => {
    if (interviewDate) {
      const today = dayjs();
      const daysLeft = interviewDate.diff(today, 'day'); // Get the difference in days
      return daysLeft >= 0 ? daysLeft : 0; // If negative, return 0
    }
    return 0; // If no date is selected, default to 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeLeft = calculateDaysLeft();
    setLoading(true);

    fetch('http://localhost:5001/api/generate-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time_left: timeLeft,
        prep_level: prepLevel,
        target_company: targetCompany
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Generate Your Dynamic LeetCode List
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Interview Date Input */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="When is your interview?"
            value={interviewDate}
            onChange={(newValue) => setInterviewDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>

        {/* Preparation Level Input */}
        <TextField
          label="Preparation Level"
          select
          value={prepLevel}
          onChange={(e) => setPrepLevel(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </TextField>

        {/* Target Company Input */}
        <TextField
          label="Target Company (optional)"
          value={targetCompany}
          onChange={(e) => setTargetCompany(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Generate List
        </Button>
      </form>

      {/* Display the list of problems */}
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <List sx={{ mt: 4 }}>
          {problems.map((problem) => (
            <ListItem
              key={problem.id}
              component="a"
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              button
            >
              <ListItemText
                primary={problem.title}
                secondary={`Difficulty: ${problem.difficulty} | Frequency: ${problem.frequency}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default DynamicLeetCodeList;