import { render, screen } from '@testing-library/react';
import { StepPill } from '../StepPill';

describe('StepPill', () => {
  it('renders the step number and label', () => {
    render(<StepPill num={1} label="Equipo" active={false} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Equipo')).toBeInTheDocument();
  });

  it('applies active styles when active=true', () => {
    const { container } = render(<StepPill num={2} label="Camiseta" active={true} />);
    const numEl = container.querySelector('.cap-step-num--active');
    expect(numEl).toBeInTheDocument();
  });

  it('does not apply active styles when active=false', () => {
    const { container } = render(<StepPill num={3} label="Resumen" active={false} />);
    const numEl = container.querySelector('.cap-step-num--active');
    expect(numEl).not.toBeInTheDocument();
  });
});
