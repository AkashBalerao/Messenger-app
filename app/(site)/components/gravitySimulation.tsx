// 'use client'

// import { useEffect, useRef, useState } from 'react';

// const GravitySimulation = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;


//     const boundaries = {
//       left: 0,
//       right: canvas.width,
//       top: 0,
//       bottom: canvas.height,
//     };

//     // Set the canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     type TrailPoint = { x: number; y: number; alpha: number };

//     // Define the type of the bodies
//     type Body = {
//       x: number;
//       y: number;
//       mass: number;
//       vx: number;
//       vy: number;
//       color: string;
//       trail: TrailPoint[];
//     };

//     // Define the bodies with colors and trails
//     const initialBodies: Body[] = [
//         { x: Math.random() * canvas.width, y: Math.random() * canvas.height, mass: 100, vx: 0, vy: 0, color: 'rgb(204, 85,0)', trail: [] },
//         { x: Math.random() * canvas.width, y: Math.random() * canvas.height, mass: 150, vx: 0, vy: 0, color: 'green', trail: [] },
//         { x: Math.random() * canvas.width, y: Math.random() * canvas.height, mass: 125, vx: 0, vy: 0, color: 'blue', trail: [] }, // Change here
//       ];
  

//     // Replace the initial state of the bodies with the corrected one
//     const bodies = initialBodies;

//     // Function to calculate gravitational force
//     function calculateGravitationalForce(body1: Body, body2: Body) {
//         const G = 0.009; // Gravitational constant
//         const dx = body2.x - body1.x;
//         const dy = body2.y - body1.y;
//         const distanceSquared = dx * dx + dy * dy;
//         const distance = Math.sqrt(distanceSquared);
//         const force = (G * body1.mass * body2.mass) / (distanceSquared + 1); // Adding 1 to avoid division by zero
//         const accelerationX = force * (dx / distance);
//         const accelerationY = force * (dy / distance);
//         return { accelerationX, accelerationY };
//       }
      

//     // Function to update the position of bodies
//     function update() {
//       if (!ctx || !canvas) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       bodies.forEach((body) => {
//         // Update velocity
//         bodies.forEach((other) => {
//           if (body !== other) {
//             const { accelerationX, accelerationY } = calculateGravitationalForce(body, other);
//             body.vx += accelerationX;
//             body.vy += accelerationY;
//           }
//         });

//         // Apply friction to slow down bodies
//         body.vx *= 0.99;
//         body.vy *= 0.99;

//         // Update position
//         body.x += body.vx;
//         body.y += body.vy;

//         // Bounce back from boundaries
//         if (body.x < boundaries.left || body.x > boundaries.right) {
//           body.vx *= -1;
//           body.x = Math.max(boundaries.left, Math.min(body.x, boundaries.right));
//         }
//         if (body.y < boundaries.top || body.y > boundaries.bottom) {
//           body.vy *= -1;
//           body.y = Math.max(boundaries.top, Math.min(body.y, boundaries.bottom));
//         }

//         // Draw the glow effect (modified)
//         const glowRadius = 20; // Adjust for desired glow size
//         const shadowBlur = 30; // Adjust for blur intensity

//         ctx.beginPath();
//         ctx.arc(body.x, body.y, glowRadius, 0, Math.PI * 2);
//         ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // White shadow color with some transparency
//         ctx.shadowOffsetX = 0;
//         ctx.shadowOffsetY = 0;
//         ctx.shadowBlur = shadowBlur;
//         ctx.fill();
//         ctx.shadowColor = 'white'; // Reset shadow

//         function lightenColor(color: string, amount: number): string {
//             const rgb = color.match(/\d+/g)?.map(Number) || [];
//             if (rgb.length !== 3) return color; // Handle invalid color format
          
//             const [r, g, b] = rgb;
//             const lighter = Math.min(255, Math.round(r + (255 - r) * amount));
//             const lighterG = Math.min(255, Math.round(g + (255 - g) * amount));
//             const lighterB = Math.min(255, Math.round(b + (255 - b) * amount));
          
//             return `rgb(${lighter}, ${lighterG}, ${lighterB})`;
//           }
          

//         // Draw the inner light (new)
//         const innerLightRadius = 15; // Adjust for inner light size
//         ctx.beginPath();
//         ctx.arc(body.x, body.y, innerLightRadius, 0, Math.PI * 2);
//         const lighterColor = lightenColor(body.color, 0.2); // Create a slightly lighter version of body color
//         ctx.fillStyle = lighterColor;
//         ctx.fill();

//         // Draw the body (existing)
        
//         // Update trail
//         body.trail.push({ x: body.x, y: body.y, alpha: 1 });
        
//         // Draw the trail
//         body.trail.forEach((point, index, points) => {
//             ctx.beginPath();
//             const alpha = point.alpha * (index / points.length); // Adjust alpha based on point index
//             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
//             ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
//             ctx.fill();
//         });
//         ctx.beginPath();
//         ctx.arc(body.x, body.y, 20, 0, Math.PI * 2);
//         ctx.fillStyle = body.color;
//         ctx.fill();

//         // Limit the length of the trail
//         if (body.trail.length > 100) {
//           body.trail.shift();
//         }

//       });

//       animationFrameId = requestAnimationFrame(update);
//     }

//     update();

//     // Event listener for window resize
//     window.addEventListener('resize', () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       // Update the boundaries when window is resized
//       boundaries.right = canvas.width;
//       boundaries.bottom = canvas.height;
//     });

//     // Cleanup function
//     return () => {
//       window.removeEventListener('resize', () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       });
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 0 }}></canvas>;
// };

// export default GravitySimulation;
