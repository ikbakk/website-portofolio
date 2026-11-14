import { useState } from 'react';

const steps = [
  { name: 'Interface', question: 'What does the person need to understand before they act?', detail: 'Clear states, useful feedback, and a path through the edge cases.' },
  { name: 'Service', question: 'What contract lets the experience stay dependable?', detail: 'Explicit boundaries, validation, and predictable failures.' },
  { name: 'Data', question: 'What should survive the request?', detail: 'A model that stays understandable as the product changes.' },
  { name: 'Release', question: 'How will we know it works in the real world?', detail: 'Observability, safe delivery, and room to improve.' },
];

export default function RequestPath() {
  const [active, setActive] = useState(0);
  return <div className="request-path" data-od-id="request-path">
    <div className="path-tabs" role="tablist" aria-label="Request path stages">
      {steps.map((step, index) => <button className="pixel-button" key={step.name} id={`step-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="path-panel" onClick={() => setActive(index)} data-od-id={`path-${step.name.toLowerCase()}`}><span>{step.name}</span></button>)}
    </div>
    <div className="path-panel" id="path-panel" role="tabpanel" aria-labelledby={`step-${active}`} tabIndex={0}>
      <h3>{steps[active].question}</h3>
      <p>{steps[active].detail}</p>
    </div>
  </div>;
}
