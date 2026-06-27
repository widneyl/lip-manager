import { Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import useRelatoriosController from "./UseRelatoriosController";

const CORES_STATUS = ['#ff9800', '#4caf50', '#2196f3', '#f44336', '#9c27b0'];

export default function Relatorios() {
  const {
    loading,
    totalTasks,
    statusCounts,
    priorityCounts,
    concludedCount,
    completionRate,
    overdueCount,
  } = useRelatoriosController();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 3 }}>
          <CardMetrica titulo="Total de tasks" valor={totalTasks} />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <CardMetrica titulo="Concluídas" valor={concludedCount} cor="#4caf50" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <CardMetrica titulo="Taxa de conclusão" valor={`${completionRate}%`} cor="#2196f3" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <CardMetrica titulo="Atrasadas" valor={overdueCount} cor="#f44336" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 600, mb: 2, fontSize: '0.9rem' }}>
                Tasks por status
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusCounts} dataKey="total" nameKey="status" outerRadius={90} label>
                    {statusCounts.map((_, index) => (
                      <Cell key={index} fill={CORES_STATUS[index % CORES_STATUS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 600, mb: 2, fontSize: '0.9rem' }}>
                Tasks por prioridade
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={priorityCounts}>
                  <XAxis dataKey="priority" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#2196f3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function CardMetrica({ titulo, valor, cor = '#0f172a' }: { titulo: string; valor: string | number; cor?: string }) {
  return (
    <Card sx={{ borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {titulo}
        </Typography>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: cor }}>
          {valor}
        </Typography>
      </CardContent>
    </Card>
  );
}