import numpy as np

def format_complex_number(c):
  if np.isclose(c.imag, 0):
    return f"{c.real:.3f}"
  elif np.isclose(c.real, 0):
    return f"{c.imag:.3f}j"
  else:
    return f"{c.real:.3f}{'+' if c.imag >= 0 else '-'}{abs(c.imag):.3f}j"