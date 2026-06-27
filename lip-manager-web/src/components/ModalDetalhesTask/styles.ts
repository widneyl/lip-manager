export const sx = {
  modal: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff', borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
    width: { xs: '95vw', sm: '780px' },
    maxHeight: '90vh', outline: 'none',
    display: 'flex', flexDirection: 'column',
  },
  field: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px', fontSize: '0.875rem',
      '&:hover fieldset':        { borderColor: '#7c3aed' },
      '&.Mui-focused fieldset':  { borderColor: '#7c3aed', borderWidth: '1.5px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#7c3aed' },
  },
  label: { fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', mb: 0.5 },
  value: { fontSize: '0.875rem', color: '#1e293b' },
  metaRow: { display: 'flex', flexDirection: 'column', gap: 0.5 },
  sidebar: {
    width: 200, flexShrink: 0, borderLeft: '1px solid #f1f5f9',
    px: 2.5, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5,
  },
  deleteModal: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff', borderRadius: '14px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    width: { xs: '90vw', sm: '380px' }, outline: 'none', overflow: 'hidden',
  },
};