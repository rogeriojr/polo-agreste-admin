const styles = () => ({
  pageTitleContainer: {
    display: 'flex',
  },
  pageTitle: {
    flex: 1,
    position: 'relative',
    '& > *': {
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)',
    },
  },
  pageTitleContent: {
    flexAlign: 'center',
  },
});

export default styles;
