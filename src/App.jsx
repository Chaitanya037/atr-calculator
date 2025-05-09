import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader } from "@mui/material";
import { calcSL, calcTarget, calcFixedSL } from "./util/Formula";

function Calculator() {
  const [stockPrice, setStockPrice] = useState(116);
  const [atr15, setAtr15] = useState(1.16);
  const [atr1hr, setAtr1hr] = useState(2.08);
  const [dailyAtr, setDailyAtr] = useState(45.52);

  const sl1_5 = calcSL(stockPrice, dailyAtr, 1.5);
  const tgt1_5 = calcTarget(stockPrice, dailyAtr, 1.5);

  const sl1_0 = calcSL(stockPrice, dailyAtr, 1.0);
  const tgt1_0 = calcTarget(stockPrice, dailyAtr, 1.0);

  const slFixed = calcFixedSL(stockPrice, 0.2);
  const tgtFixed = stockPrice * 1.2;

  return (
    <Container maxWidth="xl" sx={{ mt:3, boxSizing: "unset" }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <TextField
            label="Stock Price"
            fullWidth
            value={stockPrice}
            onChange={(e) => setStockPrice(+e.target.value)}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            label="15 Min ATR"
            fullWidth
            value={atr15}
            onChange={(e) => setAtr15(+e.target.value)}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            label="1 Hr ATR"
            fullWidth
            value={atr1hr}
            onChange={(e) => setAtr1hr(+e.target.value)}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            label="Daily ATR"
            fullWidth
            value={dailyAtr}
            onChange={(e) => setDailyAtr(+e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card>
              <CardHeader title="1.5x Multiplier" />
              <CardContent>
                <Typography>SL: {sl1_5.toFixed(2)}</Typography>
                <Typography>Target: {tgt1_5.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardHeader title="1.0x Multiplier" />
              <CardContent>
                <Typography>SL: {sl1_0.toFixed(2)}</Typography>
                <Typography>Target: {tgt1_0.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardHeader title="20% Fixed" />
              <CardContent>
                <Typography>SL: {slFixed.toFixed(2)}</Typography>
                <Typography>Target: {tgtFixed.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: "#fff" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#000" }}
      >
        ATR-Based Option Strategy Calculator
      </Typography>
      <Calculator />
    </Container>
  );
}
