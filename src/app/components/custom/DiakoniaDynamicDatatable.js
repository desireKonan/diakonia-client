import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';

import {
  Refresh as RefreshIcon,
  FileDownload as ExportIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  InfoOutlined as InfoIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

// Données d'exemple (vous pouvez remplacer ceci par vos propres données ou une API)
const sampleData = [
  { id: 1, region: 'Nord', produit: 'Ordinateur', date: '2025-01', ventes: 1200, unites: 5 },
  { id: 2, region: 'Sud', produit: 'Ordinateur', date: '2025-01', ventes: 900, unites: 4 },
  { id: 3, region: 'Est', produit: 'Ordinateur', date: '2025-01', ventes: 600, unites: 3 },
  { id: 4, region: 'Ouest', produit: 'Ordinateur', date: '2025-01', ventes: 1500, unites: 6 },
  { id: 5, region: 'Nord', produit: 'Smartphone', date: '2025-01', ventes: 3000, unites: 10 },
  { id: 6, region: 'Sud', produit: 'Smartphone', date: '2025-01', ventes: 2700, unites: 9 },
  { id: 7, region: 'Est', produit: 'Smartphone', date: '2025-01', ventes: 1800, unites: 6 },
  { id: 8, region: 'Ouest', produit: 'Smartphone', date: '2025-01', ventes: 3600, unites: 12 },
  { id: 9, region: 'Nord', produit: 'Tablette', date: '2025-01', ventes: 1500, unites: 5 },
  { id: 10, region: 'Sud', produit: 'Tablette', date: '2025-01', ventes: 1200, unites: 4 },
  { id: 11, region: 'Est', produit: 'Tablette', date: '2025-01', ventes: 900, unites: 3 },
  { id: 12, region: 'Ouest', produit: 'Tablette', date: '2025-01', ventes: 1800, unites: 6 },
  { id: 13, region: 'Nord', produit: 'Ordinateur', date: '2025-02', ventes: 1300, unites: 5 },
  { id: 14, region: 'Sud', produit: 'Ordinateur', date: '2025-02', ventes: 1000, unites: 4 },
  { id: 15, region: 'Est', produit: 'Ordinateur', date: '2025-02', ventes: 700, unites: 3 },
  { id: 16, region: 'Ouest', produit: 'Ordinateur', date: '2025-02', ventes: 1600, unites: 6 },
  { id: 17, region: 'Nord', produit: 'Smartphone', date: '2025-02', ventes: 3200, unites: 10 },
  { id: 18, region: 'Sud', produit: 'Smartphone', date: '2025-02', ventes: 2800, unites: 9 },
  { id: 19, region: 'Est', produit: 'Smartphone', date: '2025-02', ventes: 1900, unites: 6 },
  { id: 20, region: 'Ouest', produit: 'Smartphone', date: '2025-02', ventes: 3800, unites: 12 },
  { id: 21, region: 'Nord', produit: 'Ordinateur', date: '2025-03', ventes: 1400, unites: 5 },
  { id: 22, region: 'Sud', produit: 'Ordinateur', date: '2025-03', ventes: 1100, unites: 4 },
  { id: 23, region: 'Est', produit: 'Ordinateur', date: '2025-03', ventes: 800, unites: 3 },
  { id: 24, region: 'Ouest', produit: 'Ordinateur', date: '2025-03', ventes: 1700, unites: 6 },
];

// Fonction utilitaire pour extraire les valeurs uniques d'une propriété
const getUniqueValues = (data, property) => {
  return [...new Set(data.map(item => item[property]))];
};

// Fonction pour générer le tableau croisé
const generatePivotData = (data, rowField, colField, valueField, aggregation) => {
  // Obtenir les valeurs uniques pour les lignes et les colonnes
  const rowValues = getUniqueValues(data, rowField);
  const colValues = getUniqueValues(data, colField);
  
  // Initialiser la structure du tableau croisé
  const result = {
    rows: rowValues,
    columns: colValues,
    data: {},
    totals: {
      rows: {},
      columns: {},
      grand: 0
    }
  };
  
  // Fonction d'agrégation
  const aggregate = (values) => {
    if (!values || values.length === 0) return 0;
    
    switch(aggregation) {
      case 'sum':
        return values.reduce((sum, val) => sum + val, 0);
      case 'avg':
        return values.reduce((sum, val) => sum + val, 0) / values.length;
      case 'count':
        return values.length;
      case 'min':
        return Math.min(...values);
      case 'max':
        return Math.max(...values);
      default:
        return values.reduce((sum, val) => sum + val, 0);
    }
  };
  
  // Initialiser les données
  rowValues.forEach(row => {
    result.data[row] = {};
    result.totals.rows[row] = 0;
    
    colValues.forEach(col => {
      result.data[row][col] = 0;
      if (!result.totals.columns[col]) {
        result.totals.columns[col] = 0;
      }
    });
  });
  
  // Remplir les données
  data.forEach(item => {
    const rowValue = item[rowField];
    const colValue = item[colField];
    const value = parseFloat(item[valueField]) || 0;
    
    if (!result.data[rowValue]) return;
    if (!result.data[rowValue][colValue]) result.data[rowValue][colValue] = [];
    
    if (Array.isArray(result.data[rowValue][colValue])) {
      result.data[rowValue][colValue].push(value);
    } else {
      result.data[rowValue][colValue] = [value];
    }
  });
  
  // Agréger les données
  rowValues.forEach(row => {
    colValues.forEach(col => {
      if (Array.isArray(result.data[row][col])) {
        result.data[row][col] = aggregate(result.data[row][col]);
        result.totals.rows[row] += result.data[row][col];
        result.totals.columns[col] += result.data[row][col];
        result.totals.grand += result.data[row][col];
      }
    });
  });
  
  return result;
};

// Composant de Tableau Croisé
export default function DiakoniaDynamicDatatable() {
  const [data, setData] = useState(sampleData);
  const [loading, setLoading] = useState(false);
  const [rowField, setRowField] = useState('region');
  const [colField, setColField] = useState('produit');
  const [valueField, setValueField] = useState('ventes');
  const [aggregation, setAggregation] = useState('sum');
  const [pivotData, setPivotData] = useState(null);
  const [viewMode, setViewMode] = useState('tableau');
  
  // Liste des champs disponibles dans les données
  const availableFields = data && data.length > 0
    ? Object.keys(data[0]).filter(key => key !== 'id')
    : [];
  
  // Liste des champs numériques pour les valeurs
  const numericFields = data && data.length > 0
    ? availableFields.filter(key => typeof data[0][key] === 'number')
    : [];
  
  // Fonctions d'agrégation disponibles
  const aggregationFunctions = [
    { value: 'sum', label: 'Somme' },
    { value: 'avg', label: 'Moyenne' },
    { value: 'count', label: 'Nombre' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
  ];
  
  // Effet pour générer le tableau croisé lorsque les paramètres changent
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    setLoading(true);
    
    // Timeout pour simuler une opération asynchrone
    setTimeout(() => {
      const result = generatePivotData(data, rowField, colField, valueField, aggregation);
      setPivotData(result);
      setLoading(false);
    }, 500);
  }, [data, rowField, colField, valueField, aggregation]);
  
  // Fonction pour formater les valeurs numériques
  const formatValue = (value) => {
    if (valueField === 'ventes') {
      return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    }
    return new Intl.NumberFormat('fr-FR', { 
      maximumFractionDigits: 2 
    }).format(value);
  };
  
  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    if (!pivotData) return;
    
    const { rows, columns, data: pivotValues, totals } = pivotData;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // En-tête
    csvContent += `${rowField} / ${colField},${columns.join(',')},Total\n`;
    
    // Lignes de données
    rows.forEach(row => {
      csvContent += `${row},`;
      columns.forEach(col => {
        csvContent += `${pivotValues[row][col]},`;
      });
      csvContent += `${totals.rows[row]}\n`;
    });
    
    // Ligne des totaux
    csvContent += `Total,`;
    columns.forEach(col => {
      csvContent += `${totals.columns[col]},`;
    });
    csvContent += `${totals.grand}\n`;
    
    // Téléchargement
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tableau_croise.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tableau Croisé Dynamique
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="row-field-label">Lignes (Dimension 1)</InputLabel>
              <Select
                labelId="row-field-label"
                value={rowField}
                label="Lignes (Dimension 1)"
                onChange={(e) => setRowField(e.target.value)}
              >
                {availableFields.map(field => (
                  <MenuItem key={`row-${field}`} value={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="col-field-label">Colonnes (Dimension 2)</InputLabel>
              <Select
                labelId="col-field-label"
                value={colField}
                label="Colonnes (Dimension 2)"
                onChange={(e) => setColField(e.target.value)}
              >
                {availableFields.map(field => (
                  <MenuItem key={`col-${field}`} value={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="value-field-label">Valeurs</InputLabel>
              <Select
                labelId="value-field-label"
                value={valueField}
                label="Valeurs"
                onChange={(e) => setValueField(e.target.value)}
              >
                {numericFields.map(field => (
                  <MenuItem key={`val-${field}`} value={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="aggregation-label">Fonction d'agrégation</InputLabel>
              <Select
                labelId="aggregation-label"
                value={aggregation}
                label="Fonction d'agrégation"
                onChange={(e) => setAggregation(e.target.value)}
              >
                {aggregationFunctions.map(func => (
                  <MenuItem key={`agg-${func.value}`} value={func.value}>
                    {func.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Mode d'affichage">
                <Box>
                  <IconButton 
                    color={viewMode === 'tableau' ? 'primary' : 'default'}
                    onClick={() => setViewMode('tableau')}
                  >
                    <ViewModuleIcon />
                  </IconButton>
                  <IconButton 
                    color={viewMode === 'liste' ? 'primary' : 'default'}
                    onClick={() => setViewMode('liste')}
                  >
                    <ViewListIcon />
                  </IconButton>
                </Box>
              </Tooltip>
              
              <Tooltip title="Rafraîchir">
                <IconButton onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setPivotData(generatePivotData(data, rowField, colField, valueField, aggregation));
                    setLoading(false);
                  }, 500);
                }}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Exporter en CSV">
                <IconButton onClick={exportToCSV}>
                  <ExportIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {viewMode === 'tableau' && pivotData && (
            <TableContainer component={Paper} variant="outlined" sx={{ overflow: 'auto' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: 'primary.main', 
                        color: 'primary.contrastText' 
                      }}
                    >
                      {rowField.charAt(0).toUpperCase() + rowField.slice(1)} / {colField.charAt(0).toUpperCase() + colField.slice(1)}
                    </TableCell>
                    
                    {pivotData.columns.map(col => (
                      <TableCell 
                        key={col} 
                        align="right"
                        sx={{ 
                          fontWeight: 'bold', 
                          backgroundColor: 'primary.light', 
                          color: 'primary.contrastText' 
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                    
                    <TableCell 
                      align="right"
                      sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: 'secondary.main', 
                        color: 'secondary.contrastText' 
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {pivotData.rows.map(row => (
                    <TableRow key={row} hover>
                      <TableCell 
                        component="th" 
                        scope="row"
                        sx={{ 
                          fontWeight: 'bold', 
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText'
                        }}
                      >
                        {row}
                      </TableCell>
                      
                      {pivotData.columns.map(col => (
                        <TableCell 
                          key={`${row}-${col}`} 
                          align="right"
                          sx={{
                            backgroundColor: pivotData.data[row][col] > 0 ? 'rgba(200, 250, 205, 0.3)' : undefined
                          }}
                        >
                          {formatValue(pivotData.data[row][col])}
                        </TableCell>
                      ))}
                      
                      <TableCell 
                        align="right"
                        sx={{ 
                          fontWeight: 'bold', 
                          backgroundColor: 'rgba(144, 202, 249, 0.2)' 
                        }}
                      >
                        {formatValue(pivotData.totals.rows[row])}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  <TableRow>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: 'secondary.main',
                        color: 'secondary.contrastText'
                      }}
                    >
                      Total
                    </TableCell>
                    
                    {pivotData.columns.map(col => (
                      <TableCell 
                        key={`total-${col}`} 
                        align="right"
                        sx={{ 
                          fontWeight: 'bold', 
                          backgroundColor: 'rgba(144, 202, 249, 0.2)' 
                        }}
                      >
                        {formatValue(pivotData.totals.columns[col])}
                      </TableCell>
                    ))}
                    
                    <TableCell 
                      align="right"
                      sx={{ 
                        fontWeight: 'bold', 
                        backgroundColor: 'secondary.main',
                        color: 'secondary.contrastText'
                      }}
                    >
                      {formatValue(pivotData.totals.grand)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {viewMode === 'liste' && pivotData && (
            <Grid container spacing={2}>
              {pivotData.rows.map(row => (
                <Grid item xs={12} md={6} lg={4} key={row}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {rowField}: {row}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>{colField}</TableCell>
                              <TableCell align="right">{valueField}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pivotData.columns.map(col => (
                              <TableRow key={`${row}-${col}`}>
                                <TableCell>{col}</TableCell>
                                <TableCell align="right">{formatValue(pivotData.data[row][col])}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {formatValue(pivotData.totals.rows[row])}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}