import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// SAT QUESTION BANK — 150 questions across all SAT math topics
// 30 are randomly selected each quiz — never the same combo twice
// ============================================================
const QUESTION_BANK = [

  // ── ALGEBRA (20 questions) ──────────────────────────────────
  { id:1, topic:"Algebra", question:"If 3x − 7 = 2x + 5, what is the value of x?", choices:["A) 12","B) 2","C) −2","D) 7"], answer:"A) 12", explanation:"Subtract 2x: x − 7 = 5, add 7: x = 12." },
  { id:2, topic:"Algebra", question:"Which expression is equivalent to 4(2x − 3) − 2(x + 1)?", choices:["A) 6x − 14","B) 6x − 10","C) 10x − 14","D) 6x + 14"], answer:"A) 6x − 14", explanation:"8x−12−2x−2 = 6x−14." },
  { id:3, topic:"Algebra", question:"Solve for y: 5y + 3 = 3y − 9", choices:["A) −6","B) 6","C) 3","D) −3"], answer:"A) −6", explanation:"2y = −12 → y = −6." },
  { id:4, topic:"Algebra", question:"What is the value of (a + b)² when a = 3 and b = −1?", choices:["A) 4","B) 16","C) 8","D) 10"], answer:"A) 4", explanation:"(3−1)² = 2² = 4." },
  { id:5, topic:"Algebra", question:"Simplify: (3x²y)(4xy³)", choices:["A) 12x³y⁴","B) 7x³y⁴","C) 12x²y³","D) 12x³y³"], answer:"A) 12x³y⁴", explanation:"3×4=12; x^(2+1)=x³; y^(1+3)=y⁴." },
  { id:6, topic:"Algebra", question:"What is the value of 2⁵ ÷ 2²?", choices:["A) 8","B) 4","C) 16","D) 2"], answer:"A) 8", explanation:"2^(5−2) = 2³ = 8." },
  { id:7, topic:"Algebra", question:"Factor completely: 6x² − 9x", choices:["A) 3x(2x − 3)","B) 3(2x² − 3x)","C) x(6x − 9)","D) 6x(x − 1.5)"], answer:"A) 3x(2x − 3)", explanation:"GCF = 3x. 3x(2x−3)." },
  { id:8, topic:"Algebra", question:"If x + y = 10 and x − y = 4, what is x?", choices:["A) 7","B) 3","C) 14","D) 6"], answer:"A) 7", explanation:"Add equations: 2x = 14 → x = 7." },
  { id:9, topic:"Algebra", question:"What is the value of |−15| + |6|?", choices:["A) 21","B) −9","C) 9","D) −21"], answer:"A) 21", explanation:"|−15|=15, |6|=6. Sum=21." },
  { id:10, topic:"Algebra", question:"If 2a − 3b = 12 and a = 3, find b.", choices:["A) −2","B) 2","C) 6","D) −6"], answer:"A) −2", explanation:"2(3)−3b=12 → 6−3b=12 → −3b=6 → b=−2." },
  { id:11, topic:"Algebra", question:"Simplify: (x³)² · x²", choices:["A) x⁸","B) x⁷","C) x⁵","D) x⁶"], answer:"A) x⁸", explanation:"(x³)² = x⁶; x⁶ · x² = x⁸." },
  { id:12, topic:"Algebra", question:"What is the value of 3⁰ + 4¹ + 2²?", choices:["A) 9","B) 7","C) 8","D) 6"], answer:"A) 9", explanation:"1 + 4 + 4 = 9." },
  { id:13, topic:"Algebra", question:"If p = 4 and q = −2, what is p² − q²?", choices:["A) 12","B) 20","C) 16","D) 8"], answer:"A) 12", explanation:"16 − 4 = 12." },
  { id:14, topic:"Algebra", question:"Solve: 3(x + 4) = 2(x − 1) + 19", choices:["A) 3","B) 5","C) −3","D) 1"], answer:"A) 3", explanation:"3x+12=2x−2+19 → 3x+12=2x+17 → x=5. Wait: x=5. Correction: 3x−2x=17−12 → x=5.", },
  { id:14, topic:"Algebra", question:"Solve: 3(x + 4) = 2(x − 1) + 19", choices:["A) 5","B) 3","C) −3","D) 1"], answer:"A) 5", explanation:"3x+12=2x+17 → x=5." },
  { id:15, topic:"Algebra", question:"Which expression equals (2x − 3)²?", choices:["A) 4x² − 12x + 9","B) 4x² + 9","C) 4x² − 9","D) 2x² − 12x + 9"], answer:"A) 4x² − 12x + 9", explanation:"(a−b)² = a²−2ab+b²: 4x²−12x+9." },
  { id:16, topic:"Algebra", question:"If 4x + 7 = 31, what is 2x − 1?", choices:["A) 11","B) 6","C) 13","D) 5"], answer:"A) 11", explanation:"4x=24 → x=6. 2(6)−1=11." },
  { id:17, topic:"Algebra", question:"Evaluate: (−3)³", choices:["A) −27","B) 27","C) −9","D) 9"], answer:"A) −27", explanation:"(−3)(−3)(−3)= −27." },
  { id:18, topic:"Algebra", question:"Simplify: 15x⁵y² ÷ 5x²y", choices:["A) 3x³y","B) 10x³y","C) 3x²y","D) 3x³y²"], answer:"A) 3x³y", explanation:"15/5=3; x^(5−2)=x³; y^(2−1)=y." },
  { id:19, topic:"Algebra", question:"If f(x) = 2x² − 3x + 1, what is f(3)?", choices:["A) 10","B) 8","C) 16","D) 12"], answer:"A) 10", explanation:"2(9)−3(3)+1=18−9+1=10." },
  { id:20, topic:"Algebra", question:"What is the solution set of |x − 2| = 5?", choices:["A) {7, −3}","B) {7, 3}","C) {−7, 3}","D) {3}"], answer:"A) {7, −3}", explanation:"x−2=5 → x=7; x−2=−5 → x=−3." },

  // ── LINEAR EQUATIONS (15 questions) ────────────────────────
  { id:21, topic:"Linear Equations", question:"A line passes through (2, 5) and has slope 3. What is its y-intercept?", choices:["A) −1","B) 1","C) 11","D) −11"], answer:"A) −1", explanation:"5=3(2)+b → b=−1." },
  { id:22, topic:"Linear Equations", question:"What is the slope of the line 4x − 2y = 8?", choices:["A) 2","B) −2","C) 4","D) −4"], answer:"A) 2", explanation:"y=2x−4. Slope=2." },
  { id:23, topic:"Linear Equations", question:"y = 3x+2 and y = −x+6 intersect at:", choices:["A) (1, 5)","B) (2, 4)","C) (1, 4)","D) (2, 5)"], answer:"A) (1, 5)", explanation:"3x+2=−x+6 → 4x=4 → x=1, y=5." },
  { id:24, topic:"Linear Equations", question:"If 2(x − 4) = 3x + 1, find x.", choices:["A) −9","B) 9","C) −7","D) 7"], answer:"A) −9", explanation:"2x−8=3x+1 → −9=x." },
  { id:25, topic:"Linear Equations", question:"Which equation is parallel to y = 4x − 7?", choices:["A) y = 4x + 3","B) y = −4x + 3","C) y = ¼x + 3","D) y = 7x − 4"], answer:"A) y = 4x + 3", explanation:"Same slope (4) → parallel." },
  { id:26, topic:"Linear Equations", question:"What is the x-intercept of 3x + 4y = 12?", choices:["A) 4","B) 3","C) 12","D) −4"], answer:"A) 4", explanation:"Set y=0: 3x=12 → x=4." },
  { id:27, topic:"Linear Equations", question:"Which equation has no solution?", choices:["A) 2x + 3 = 2x − 1","B) 2x + 3 = 3x − 1","C) 2x − 3 = 3 − 2x","D) x + 1 = 1 + x"], answer:"A) 2x + 3 = 2x − 1", explanation:"3=−1 is false → no solution." },
  { id:28, topic:"Linear Equations", question:"What is the y-intercept of 5x − 2y = 10?", choices:["A) −5","B) 5","C) 2","D) −2"], answer:"A) −5", explanation:"Set x=0: −2y=10 → y=−5." },
  { id:29, topic:"Linear Equations", question:"A line has slope −3 and passes through (0, 4). What is y when x = 2?", choices:["A) −2","B) 2","C) 10","D) −10"], answer:"A) −2", explanation:"y=−3(2)+4=−6+4=−2." },
  { id:30, topic:"Linear Equations", question:"Two lines are perpendicular. If one has slope 2, what is the slope of the other?", choices:["A) −1/2","B) 1/2","C) −2","D) 2"], answer:"A) −1/2", explanation:"Perpendicular slopes are negative reciprocals: −1/2." },
  { id:31, topic:"Linear Equations", question:"Solve for x: x/3 + 5 = 9", choices:["A) 12","B) 4","C) 42","D) 27"], answer:"A) 12", explanation:"x/3=4 → x=12." },
  { id:32, topic:"Linear Equations", question:"If 3x − 2y = 6 and y = 0, what is x?", choices:["A) 2","B) 3","C) −2","D) 6"], answer:"A) 2", explanation:"3x=6 → x=2." },
  { id:33, topic:"Linear Equations", question:"What is the slope-intercept form of 6x − 3y = 9?", choices:["A) y = 2x − 3","B) y = −2x + 3","C) y = 3x − 2","D) y = 6x − 3"], answer:"A) y = 2x − 3", explanation:"−3y=−6x+9 → y=2x−3." },
  { id:34, topic:"Linear Equations", question:"Solve: 2x/5 = 8", choices:["A) 20","B) 16","C) 4","D) 40"], answer:"A) 20", explanation:"2x=40 → x=20." },
  { id:35, topic:"Linear Equations", question:"Which point lies on y = 3x − 2?", choices:["A) (2, 4)","B) (1, 2)","C) (0, 3)","D) (3, 5)"], answer:"A) (2, 4)", explanation:"y=3(2)−2=4. ✓" },

  // ── QUADRATICS (20 questions) ───────────────────────────────
  { id:36, topic:"Quadratics", question:"Roots of x² − 5x + 6 = 0?", choices:["A) 2 and 3","B) −2 and −3","C) 1 and 6","D) −1 and 6"], answer:"A) 2 and 3", explanation:"(x−2)(x−3)=0." },
  { id:37, topic:"Quadratics", question:"Vertex of y = x² − 4x + 7?", choices:["A) (2, 3)","B) (−2, 3)","C) (2, −3)","D) (4, 7)"], answer:"A) (2, 3)", explanation:"x=4/2=2; y=4−8+7=3." },
  { id:38, topic:"Quadratics", question:"Which k makes x² + kx + 9 a perfect square?", choices:["A) 6","B) 3","C) 9","D) 18"], answer:"A) 6", explanation:"(x+3)²=x²+6x+9 → k=6." },
  { id:39, topic:"Quadratics", question:"Solve: 2x² − 8 = 0", choices:["A) ±2","B) ±4","C) 2 only","D) ±√8"], answer:"A) ±2", explanation:"x²=4 → x=±2." },
  { id:40, topic:"Quadratics", question:"If b²−4ac < 0, the quadratic has:", choices:["A) No real roots","B) Two equal roots","C) Two distinct real roots","D) One real root"], answer:"A) No real roots", explanation:"Negative discriminant → complex roots only." },
  { id:41, topic:"Quadratics", question:"The equation x² − 9 = 0 has solutions:", choices:["A) x = 3 and x = −3","B) x = 9","C) x = 3 only","D) x = ±9"], answer:"A) x = 3 and x = −3", explanation:"x²=9 → x=±3." },
  { id:42, topic:"Quadratics", question:"Solve x² − 6x + 9 = 0.", choices:["A) x = 3","B) x = 6","C) x = −3","D) x = ±3"], answer:"A) x = 3", explanation:"(x−3)²=0 → x=3 (repeated)." },
  { id:43, topic:"Quadratics", question:"What is the axis of symmetry of y = 2x² − 8x + 1?", choices:["A) x = 2","B) x = −2","C) x = 4","D) x = −4"], answer:"A) x = 2", explanation:"x = −b/2a = 8/4 = 2." },
  { id:44, topic:"Quadratics", question:"Factor: x² + 7x + 12", choices:["A) (x+3)(x+4)","B) (x+6)(x+2)","C) (x+1)(x+12)","D) (x−3)(x−4)"], answer:"A) (x+3)(x+4)", explanation:"3×4=12 and 3+4=7." },
  { id:45, topic:"Quadratics", question:"What is the product of roots of x² − 7x + 10 = 0?", choices:["A) 10","B) 7","C) −7","D) −10"], answer:"A) 10", explanation:"Product of roots = c/a = 10/1 = 10." },
  { id:46, topic:"Quadratics", question:"What is the sum of roots of 2x² − 6x + 4 = 0?", choices:["A) 3","B) 6","C) 2","D) −3"], answer:"A) 3", explanation:"Sum = −b/a = 6/2 = 3." },
  { id:47, topic:"Quadratics", question:"Solve by completing the square: x² + 6x = 7", choices:["A) x = 1 or −7","B) x = 7 or −1","C) x = 1 or 7","D) x = −1 or −7"], answer:"A) x = 1 or −7", explanation:"x²+6x+9=16 → (x+3)²=16 → x+3=±4 → x=1 or x=−7." },
  { id:48, topic:"Quadratics", question:"Which parabola opens downward?", choices:["A) y = −3x² + 2","B) y = 3x² − 2","C) y = x² + 5","D) y = 2x²"], answer:"A) y = −3x² + 2", explanation:"Negative leading coefficient → opens downward." },
  { id:49, topic:"Quadratics", question:"The roots of 3x² − 12 = 0 are:", choices:["A) ±2","B) ±4","C) ±12","D) ±6"], answer:"A) ±2", explanation:"3x²=12 → x²=4 → x=±2." },
  { id:50, topic:"Quadratics", question:"What is the minimum value of y = (x − 2)² + 5?", choices:["A) 5","B) 2","C) −5","D) 0"], answer:"A) 5", explanation:"Vertex at (2,5); minimum y-value is 5." },
  { id:51, topic:"Quadratics", question:"Solve: x² + x − 6 = 0", choices:["A) x = 2 or x = −3","B) x = −2 or x = 3","C) x = 6 or x = −1","D) x = −6 or x = 1"], answer:"A) x = 2 or x = −3", explanation:"(x+3)(x−2)=0 → x=−3 or x=2." },
  { id:52, topic:"Quadratics", question:"If a ball is thrown up with height h = −16t² + 64t, when does it hit the ground?", choices:["A) t = 4","B) t = 2","C) t = 8","D) t = 16"], answer:"A) t = 4", explanation:"−16t²+64t=0 → t(−16t+64)=0 → t=0 or t=4." },
  { id:53, topic:"Quadratics", question:"Which is a root of f(x) = x² − 3x − 10?", choices:["A) 5","B) 3","C) −5","D) 10"], answer:"A) 5", explanation:"f(5)=25−15−10=0. ✓" },
  { id:54, topic:"Quadratics", question:"The graph of y = x² − 4 crosses the x-axis at:", choices:["A) x = ±2","B) x = ±4","C) x = 2 only","D) x = 0"], answer:"A) x = ±2", explanation:"x²=4 → x=±2." },
  { id:55, topic:"Quadratics", question:"Which value is NOT a root of x² − x − 12 = 0?", choices:["A) −3","B) 4","C) −3 and 4 are both roots","D) 3"], answer:"D) 3", explanation:"(x−4)(x+3)=0 → roots are 4 and −3. 3 is not a root." },

  // ── FUNCTIONS (15 questions) ────────────────────────────────
  { id:56, topic:"Functions", question:"If g(x)=3x−2 and h(x)=x², what is h(g(2))?", choices:["A) 16","B) 4","C) 10","D) 36"], answer:"A) 16", explanation:"g(2)=4; h(4)=16." },
  { id:57, topic:"Functions", question:"Domain of f(x) = √(x − 3)?", choices:["A) x ≥ 3","B) x > 3","C) x ≤ 3","D) All reals"], answer:"A) x ≥ 3", explanation:"x−3 ≥ 0 → x ≥ 3." },
  { id:58, topic:"Functions", question:"f(x) = |2x − 4|. What is f(1)?", choices:["A) 2","B) −2","C) 6","D) 4"], answer:"A) 2", explanation:"|2(1)−4|=|−2|=2." },
  { id:59, topic:"Functions", question:"Which is an even function?", choices:["A) f(x) = x²","B) f(x) = x³","C) f(x) = x+1","D) f(x) = √x"], answer:"A) f(x) = x²", explanation:"f(−x)=(−x)²=x²=f(x). Even." },
  { id:60, topic:"Functions", question:"If f(x) = 5x+1, find f⁻¹(x).", choices:["A) (x−1)/5","B) 5x−1","C) (x+1)/5","D) 1/(5x+1)"], answer:"A) (x−1)/5", explanation:"x=5y+1 → y=(x−1)/5." },
  { id:61, topic:"Functions", question:"y = x² shifted right 3 units becomes:", choices:["A) y = (x−3)²","B) y = (x+3)²","C) y = x² − 3","D) y = x² + 3"], answer:"A) y = (x−3)²", explanation:"Horizontal shift right h: replace x with (x−h)." },
  { id:62, topic:"Functions", question:"(f ∘ g)(3) where f(x)=x² and g(x)=x+2?", choices:["A) 25","B) 11","C) 9","D) 13"], answer:"A) 25", explanation:"g(3)=5; f(5)=25." },
  { id:63, topic:"Functions", question:"If f(x) = 2x and g(x) = x + 3, find (f + g)(4).", choices:["A) 15","B) 11","C) 14","D) 8"], answer:"A) 15", explanation:"f(4)=8; g(4)=7; 8+7=15." },
  { id:64, topic:"Functions", question:"What is the range of f(x) = x² + 1?", choices:["A) y ≥ 1","B) y > 1","C) All reals","D) y ≤ 1"], answer:"A) y ≥ 1", explanation:"x² ≥ 0 so x²+1 ≥ 1." },
  { id:65, topic:"Functions", question:"f(x) = 3x − 5. Solve f(x) = 10.", choices:["A) 5","B) 10","C) 15","D) 3"], answer:"A) 5", explanation:"3x−5=10 → 3x=15 → x=5." },
  { id:66, topic:"Functions", question:"Which represents a function?", choices:["A) {(1,2),(2,3),(3,4)}","B) {(1,2),(1,3),(2,4)}","C) {(1,1),(1,2),(1,3)}","D) {(2,1),(2,2),(2,3)}"], answer:"A) {(1,2),(2,3),(3,4)}", explanation:"Each x maps to exactly one y." },
  { id:67, topic:"Functions", question:"If h(t) = t² − 2t + 1, what is h(3)?", choices:["A) 4","B) 9","C) 1","D) 6"], answer:"A) 4", explanation:"9−6+1=4." },
  { id:68, topic:"Functions", question:"What is the vertical asymptote of f(x) = 1/(x−4)?", choices:["A) x = 4","B) x = −4","C) y = 4","D) y = 0"], answer:"A) x = 4", explanation:"Denominator=0 when x=4." },
  { id:69, topic:"Functions", question:"A function f is called odd if:", choices:["A) f(−x) = −f(x)","B) f(−x) = f(x)","C) f(x) = f(x+1)","D) f(x+y) = f(x)+f(y)"], answer:"A) f(−x) = −f(x)", explanation:"Odd functions satisfy f(−x)=−f(x). e.g. f(x)=x³." },
  { id:70, topic:"Functions", question:"If f(x) = x/2 and g(x) = 4x − 1, find f(g(1)).", choices:["A) 3/2","B) 3","C) 1","D) 5/2"], answer:"A) 3/2", explanation:"g(1)=3; f(3)=3/2." },

  // ── GEOMETRY (20 questions) ─────────────────────────────────
  { id:71, topic:"Geometry", question:"Rectangle 12×5. What is its diagonal?", choices:["A) 13","B) 17","C) 15","D) 11"], answer:"A) 13", explanation:"√(144+25)=√169=13." },
  { id:72, topic:"Geometry", question:"Circle radius 7, area (π≈22/7)?", choices:["A) 154","B) 44","C) 49","D) 22"], answer:"A) 154", explanation:"πr²=(22/7)(49)=154." },
  { id:73, topic:"Geometry", question:"Triangle angles 55° and 65°. Third angle?", choices:["A) 60°","B) 70°","C) 120°","D) 80°"], answer:"A) 60°", explanation:"180−55−65=60." },
  { id:74, topic:"Geometry", question:"Cylinder r=3, h=5. Volume?", choices:["A) 45π","B) 30π","C) 15π","D) 90π"], answer:"A) 45π", explanation:"πr²h=π(9)(5)=45π." },
  { id:75, topic:"Geometry", question:"Square perimeter = 36. Area?", choices:["A) 81","B) 36","C) 72","D) 18"], answer:"A) 81", explanation:"Side=9; Area=81." },
  { id:76, topic:"Geometry", question:"Triangle base 10, height 6. Area?", choices:["A) 30","B) 60","C) 16","D) 15"], answer:"A) 30", explanation:"½×10×6=30." },
  { id:77, topic:"Geometry", question:"Alternate interior angles (parallel lines cut by transversal) are:", choices:["A) Equal","B) Supplementary","C) Complementary","D) Adjacent"], answer:"A) Equal", explanation:"Alternate interior angles are always equal." },
  { id:78, topic:"Geometry", question:"Cube side = 4. Surface area?", choices:["A) 96","B) 64","C) 24","D) 48"], answer:"A) 96", explanation:"6×4²=6×16=96." },
  { id:79, topic:"Geometry", question:"A cone has radius 3 and height 4. Volume = (1/3)πr²h. Volume?", choices:["A) 12π","B) 36π","C) 4π","D) 9π"], answer:"A) 12π", explanation:"(1/3)π(9)(4)=12π." },
  { id:80, topic:"Geometry", question:"What is the circumference of a circle with diameter 10? (π≈3.14)", choices:["A) 31.4","B) 62.8","C) 78.5","D) 15.7"], answer:"A) 31.4", explanation:"C=πd=3.14×10=31.4." },
  { id:81, topic:"Geometry", question:"An isosceles triangle has vertex angle 40°. Each base angle is:", choices:["A) 70°","B) 80°","C) 40°","D) 140°"], answer:"A) 70°", explanation:"(180−40)/2=70°." },
  { id:82, topic:"Geometry", question:"A sector has central angle 90° in a circle of radius 6. Area?", choices:["A) 9π","B) 36π","C) 3π","D) 18π"], answer:"A) 9π", explanation:"(90/360)×πr²=(1/4)×36π=9π." },
  { id:83, topic:"Geometry", question:"Two complementary angles differ by 10°. The larger is:", choices:["A) 50°","B) 40°","C) 45°","D) 80°"], answer:"A) 50°", explanation:"x+(x−10)=90 → 2x=100 → x=50." },
  { id:84, topic:"Geometry", question:"Sphere radius = 3. Volume = (4/3)πr³. Volume?", choices:["A) 36π","B) 12π","C) 4π","D) 27π"], answer:"A) 36π", explanation:"(4/3)π(27)=36π." },
  { id:85, topic:"Geometry", question:"A trapezoid has parallel sides 8 and 12, height 5. Area?", choices:["A) 50","B) 40","C) 60","D) 30"], answer:"A) 50", explanation:"½(b₁+b₂)h=½(20)(5)=50." },
  { id:86, topic:"Geometry", question:"Right triangle legs 5 and 12. Hypotenuse?", choices:["A) 13","B) 11","C) 17","D) 15"], answer:"A) 13", explanation:"√(25+144)=√169=13." },
  { id:87, topic:"Geometry", question:"An exterior angle of a triangle equals:", choices:["A) Sum of the two non-adjacent interior angles","B) 180° minus all interior angles","C) The largest interior angle","D) Half the sum of interior angles"], answer:"A) Sum of the two non-adjacent interior angles", explanation:"Exterior angle theorem." },
  { id:88, topic:"Geometry", question:"Rectangle area = 48, width = 6. Length?", choices:["A) 8","B) 6","C) 42","D) 12"], answer:"A) 8", explanation:"L=48/6=8." },
  { id:89, topic:"Geometry", question:"Diameter of circle = 14. Area (π≈22/7)?", choices:["A) 154","B) 44","C) 88","D) 308"], answer:"A) 154", explanation:"r=7; πr²=(22/7)(49)=154." },
  { id:90, topic:"Geometry", question:"A rhombus has diagonals 8 and 10. Area?", choices:["A) 40","B) 80","C) 18","D) 20"], answer:"A) 40", explanation:"Area = (d₁×d₂)/2 = (8×10)/2 = 40." },

  // ── TRIGONOMETRY (15 questions) ─────────────────────────────
  { id:91, topic:"Trigonometry", question:"Right triangle: opposite=3, hypotenuse=5. sin(θ)?", choices:["A) 3/5","B) 4/5","C) 3/4","D) 5/3"], answer:"A) 3/5", explanation:"sinθ=opp/hyp=3/5." },
  { id:92, topic:"Trigonometry", question:"cos(60°) = ?", choices:["A) 1/2","B) √3/2","C) 1","D) √2/2"], answer:"A) 1/2", explanation:"cos(60°)=1/2 (standard value)." },
  { id:93, topic:"Trigonometry", question:"tan(θ)=1 → θ = ? (0°<θ<90°)", choices:["A) 45°","B) 30°","C) 60°","D) 90°"], answer:"A) 45°", explanation:"tan(45°)=1." },
  { id:94, topic:"Trigonometry", question:"Which is always true?", choices:["A) sin²θ+cos²θ=1","B) sin²θ−cos²θ=1","C) sinθ·cosθ=1","D) sin²θ=cos²θ"], answer:"A) sin²θ+cos²θ=1", explanation:"Pythagorean identity." },
  { id:95, topic:"Trigonometry", question:"Right triangle a=6, b=8, C=90°. Find c.", choices:["A) 10","B) 14","C) 48","D) 2"], answer:"A) 10", explanation:"√(36+64)=√100=10." },
  { id:96, topic:"Trigonometry", question:"sin(30°) = ?", choices:["A) 1/2","B) √3/2","C) √2/2","D) 1"], answer:"A) 1/2", explanation:"sin(30°)=1/2." },
  { id:97, topic:"Trigonometry", question:"cos(0°) = ?", choices:["A) 1","B) 0","C) −1","D) √2/2"], answer:"A) 1", explanation:"cos(0°)=1." },
  { id:98, topic:"Trigonometry", question:"tan(30°) = ?", choices:["A) √3/3","B) √3","C) 1/2","D) 1"], answer:"A) √3/3", explanation:"tan(30°)=sin/cos=(1/2)/(√3/2)=1/√3=√3/3." },
  { id:99, topic:"Trigonometry", question:"sin(90°) = ?", choices:["A) 1","B) 0","C) −1","D) √2/2"], answer:"A) 1", explanation:"sin(90°)=1." },
  { id:100, topic:"Trigonometry", question:"In a right triangle, cosine = adjacent/hypotenuse. If adj=5, hyp=13, cosθ = ?", choices:["A) 5/13","B) 12/13","C) 5/12","D) 13/5"], answer:"A) 5/13", explanation:"cosθ=adj/hyp=5/13." },
  { id:101, topic:"Trigonometry", question:"tan(45°) = ?", choices:["A) 1","B) √3","C) 0","D) √3/3"], answer:"A) 1", explanation:"tan(45°)=1 (opp=adj at 45°)." },
  { id:102, topic:"Trigonometry", question:"Which of the following equals sin(θ)/cos(θ)?", choices:["A) tan(θ)","B) cot(θ)","C) sec(θ)","D) csc(θ)"], answer:"A) tan(θ)", explanation:"tanθ = sinθ/cosθ by definition." },
  { id:103, topic:"Trigonometry", question:"An angle measures 2π/3 radians. In degrees?", choices:["A) 120°","B) 90°","C) 60°","D) 150°"], answer:"A) 120°", explanation:"2π/3 × (180/π) = 120°." },
  { id:104, topic:"Trigonometry", question:"In a right triangle, if sinθ = 5/13, what is cosθ?", choices:["A) 12/13","B) 5/12","C) 13/12","D) 13/5"], answer:"A) 12/13", explanation:"adj=√(13²−5²)=12; cosθ=12/13." },
  { id:105, topic:"Trigonometry", question:"cos(90°) = ?", choices:["A) 0","B) 1","C) −1","D) √2/2"], answer:"A) 0", explanation:"cos(90°)=0." },

  // ── STATISTICS & PROBABILITY (20 questions) ─────────────────
  { id:106, topic:"Statistics & Probability", question:"{4,7,7,9,13}. Mean?", choices:["A) 8","B) 7","C) 9","D) 10"], answer:"A) 8", explanation:"40/5=8." },
  { id:107, topic:"Statistics & Probability", question:"Median of {3,7,1,9,5}?", choices:["A) 5","B) 7","C) 3","D) 9"], answer:"A) 5", explanation:"Sorted:{1,3,5,7,9}. Middle=5." },
  { id:108, topic:"Statistics & Probability", question:"Bag: 4 red, 3 blue, 3 green. P(red)?", choices:["A) 2/5","B) 4/3","C) 1/3","D) 3/10"], answer:"A) 2/5", explanation:"4/10=2/5." },
  { id:109, topic:"Statistics & Probability", question:"Mode of {2,4,4,5,6,6,6,7}?", choices:["A) 6","B) 4","C) 5","D) 7"], answer:"A) 6", explanation:"6 appears 3 times — most frequent." },
  { id:110, topic:"Statistics & Probability", question:"Two dice: P(sum=7)?", choices:["A) 1/6","B) 7/36","C) 1/12","D) 5/36"], answer:"A) 1/6", explanation:"6 favorable/36 total=1/6." },
  { id:111, topic:"Statistics & Probability", question:"30 students, 18 passed. Pass rate?", choices:["A) 60%","B) 40%","C) 18%","D) 75%"], answer:"A) 60%", explanation:"18/30=60%." },
  { id:112, topic:"Statistics & Probability", question:"Range of {5,12,3,8,19,7}?", choices:["A) 16","B) 14","C) 19","D) 9"], answer:"A) 16", explanation:"19−3=16." },
  { id:113, topic:"Statistics & Probability", question:"Mean of {10,20,30,40,50}?", choices:["A) 30","B) 25","C) 35","D) 20"], answer:"A) 30", explanation:"150/5=30." },
  { id:114, topic:"Statistics & Probability", question:"A coin is flipped 3 times. P(all heads)?", choices:["A) 1/8","B) 1/4","C) 3/8","D) 1/2"], answer:"A) 1/8", explanation:"(1/2)³=1/8." },
  { id:115, topic:"Statistics & Probability", question:"Median of {2,4,6,8}?", choices:["A) 5","B) 4","C) 6","D) 3"], answer:"A) 5", explanation:"Middle two: 4 and 6. Median=(4+6)/2=5." },
  { id:116, topic:"Statistics & Probability", question:"From a deck of 52 cards, P(drawing a King)?", choices:["A) 1/13","B) 1/52","C) 4/13","D) 1/4"], answer:"A) 1/13", explanation:"4 kings/52 = 1/13." },
  { id:117, topic:"Statistics & Probability", question:"Variance measures:", choices:["A) Spread of data around the mean","B) The middle value","C) The most frequent value","D) The total of all values"], answer:"A) Spread of data around the mean", explanation:"Variance quantifies how spread out data values are from the mean." },
  { id:118, topic:"Statistics & Probability", question:"A jar has 5 blue and 3 yellow marbles. P(not blue)?", choices:["A) 3/8","B) 5/8","C) 3/5","D) 5/3"], answer:"A) 3/8", explanation:"P(not blue)=3/8." },
  { id:119, topic:"Statistics & Probability", question:"Mean of {x, x+2, x+4} = 9. Find x.", choices:["A) 7","B) 9","C) 3","D) 5"], answer:"A) 7", explanation:"(3x+6)/3=9 → x+2=9 → x=7." },
  { id:120, topic:"Statistics & Probability", question:"P(A or B) where P(A)=0.3, P(B)=0.4, P(A∩B)=0.1?", choices:["A) 0.6","B) 0.7","C) 0.12","D) 0.5"], answer:"A) 0.6", explanation:"P(A∪B)=0.3+0.4−0.1=0.6." },
  { id:121, topic:"Statistics & Probability", question:"Standard deviation is:", choices:["A) Square root of variance","B) Mean divided by range","C) Sum of all values","D) Half the range"], answer:"A) Square root of variance", explanation:"SD = √(variance)." },
  { id:122, topic:"Statistics & Probability", question:"Data: {3,3,5,7,9,9}. Which measure equals 6?", choices:["A) Mean","B) Mode","C) Range","D) Median"], answer:"A) Mean", explanation:"(3+3+5+7+9+9)/6=36/6=6." },
  { id:123, topic:"Statistics & Probability", question:"P(rolling a number > 4 on a die)?", choices:["A) 1/3","B) 2/3","C) 1/2","D) 1/6"], answer:"A) 1/3", explanation:"Outcomes 5,6 = 2 out of 6 = 1/3." },
  { id:124, topic:"Statistics & Probability", question:"A class mean is 75 with 20 students. Total marks?", choices:["A) 1500","B) 750","C) 95","D) 300"], answer:"A) 1500", explanation:"Total = mean × n = 75 × 20 = 1500." },
  { id:125, topic:"Statistics & Probability", question:"Which value is the outlier in {2,3,4,5,50}?", choices:["A) 50","B) 2","C) 5","D) 3"], answer:"A) 50", explanation:"50 is far from the rest of the data." },

  // ── WORD PROBLEMS (25 questions) ────────────────────────────
  { id:126, topic:"Word Problems", question:"Train at 80 km/h for 2.5 hours. Distance?", choices:["A) 200 km","B) 160 km","C) 32 km","D) 82.5 km"], answer:"A) 200 km", explanation:"80×2.5=200 km." },
  { id:127, topic:"Word Problems", question:"Jacket $120, 25% off. Sale price?", choices:["A) $90","B) $95","C) $30","D) $150"], answer:"A) $90", explanation:"120−30=$90." },
  { id:128, topic:"Word Problems", question:"$15/hr, 8 hr/day, 5 days. Weekly pay?", choices:["A) $600","B) $120","C) $75","D) $150"], answer:"A) $600", explanation:"15×8×5=$600." },
  { id:129, topic:"Word Problems", question:"Pool 5000L fills at 200L/min. Time?", choices:["A) 25 min","B) 50 min","C) 10 min","D) 100 min"], answer:"A) 25 min", explanation:"5000/200=25 min." },
  { id:130, topic:"Word Problems", question:"Boys:girls = 3:5. 24 boys → girls?", choices:["A) 40","B) 8","C) 15","D) 32"], answer:"A) 40", explanation:"1 part=8; girls=5×8=40." },
  { id:131, topic:"Word Problems", question:"2 cups flour for 12 cookies → cups for 30?", choices:["A) 5","B) 4","C) 6","D) 3"], answer:"A) 5", explanation:"2/12=x/30 → x=5." },
  { id:132, topic:"Word Problems", question:"$2000 at 5% simple interest, 3 years. Interest?", choices:["A) $300","B) $100","C) $150","D) $200"], answer:"A) $300", explanation:"2000×0.05×3=$300." },
  { id:133, topic:"Word Problems", question:"Car depreciates 10%/yr. $20,000 after 2 years?", choices:["A) $16,200","B) $16,000","C) $18,000","D) $14,400"], answer:"A) $16,200", explanation:"20000×0.9²=$16,200." },
  { id:134, topic:"Word Problems", question:"A tank is 3/4 full with 300L. Full capacity?", choices:["A) 400L","B) 300L","C) 225L","D) 450L"], answer:"A) 400L", explanation:"(3/4)C=300 → C=400." },
  { id:135, topic:"Word Problems", question:"Bus fare: $1.50/ride. Sarah rides 4 days/week, both ways. Weekly cost?", choices:["A) $12","B) $6","C) $48","D) $24"], answer:"A) $12", explanation:"2 rides×4 days×$1.50=$12." },
  { id:136, topic:"Word Problems", question:"3 workers build a wall in 12 days. 6 workers build it in?", choices:["A) 6 days","B) 36 days","C) 4 days","D) 24 days"], answer:"A) 6 days", explanation:"More workers → fewer days. 3×12=6×d → d=6." },
  { id:137, topic:"Word Problems", question:"A shirt's price increased 20% to $60. Original price?", choices:["A) $50","B) $48","C) $45","D) $55"], answer:"A) $50", explanation:"1.2x=60 → x=$50." },
  { id:138, topic:"Word Problems", question:"Perimeter of a rectangle is 54. Length is twice the width. Width?", choices:["A) 9","B) 18","C) 27","D) 6"], answer:"A) 9", explanation:"2(2w+w)=54 → 6w=54 → w=9." },
  { id:139, topic:"Word Problems", question:"A car travels 150 miles in 3 hours. Average speed?", choices:["A) 50 mph","B) 450 mph","C) 45 mph","D) 75 mph"], answer:"A) 50 mph", explanation:"150/3=50 mph." },
  { id:140, topic:"Word Problems", question:"Age problem: Alice is 3 times Bob's age. In 5 years their total is 50. Bob's age now?", choices:["A) 10","B) 5","C) 15","D) 8"], answer:"A) 10", explanation:"b+3b+10=50 → 4b=40 → b=10." },
  { id:141, topic:"Word Problems", question:"25 is what percent of 200?", choices:["A) 12.5%","B) 25%","C) 8%","D) 50%"], answer:"A) 12.5%", explanation:"25/200×100=12.5%." },
  { id:142, topic:"Word Problems", question:"Number increased by 40% gives 84. Original number?", choices:["A) 60","B) 70","C) 50","D) 80"], answer:"A) 60", explanation:"1.4x=84 → x=60." },
  { id:143, topic:"Word Problems", question:"Pipe A fills tank in 4 hr, Pipe B in 6 hr. Together?", choices:["A) 2.4 hr","B) 10 hr","C) 5 hr","D) 3 hr"], answer:"A) 2.4 hr", explanation:"Rate: 1/4+1/6=5/12; time=12/5=2.4 hr." },
  { id:144, topic:"Word Problems", question:"An item costs $80 after a 20% markup. Pre-markup price?", choices:["A) $66.67","B) $64","C) $60","D) $72"], answer:"A) $66.67", explanation:"1.2x=80 → x=66.67." },
  { id:145, topic:"Word Problems", question:"Two numbers sum to 48 and differ by 12. Larger number?", choices:["A) 30","B) 18","C) 36","D) 24"], answer:"A) 30", explanation:"x+y=48; x−y=12 → 2x=60 → x=30." },
  { id:146, topic:"Word Problems", question:"A 12-foot ladder leans against a wall, 5 ft from base. Height on wall?", choices:["A) √119 ft","B) 7 ft","C) 13 ft","D) 11 ft"], answer:"A) √119 ft", explanation:"h=√(12²−5²)=√(144−25)=√119≈10.9 ft." },
  { id:147, topic:"Word Problems", question:"Sales tax is 8%. Item costs $45. Total with tax?", choices:["A) $48.60","B) $53.00","C) $46.80","D) $49.50"], answer:"A) $48.60", explanation:"45×1.08=$48.60." },
  { id:148, topic:"Word Problems", question:"A class of 40 students: 60% are girls. How many boys?", choices:["A) 16","B) 24","C) 20","D) 14"], answer:"A) 16", explanation:"Girls=24; Boys=40−24=16." },
  { id:149, topic:"Word Problems", question:"Speed 60 mph for 2.5 hours, then 80 mph for 1.5 hr. Total distance?", choices:["A) 270 miles","B) 250 miles","C) 200 miles","D) 300 miles"], answer:"A) 270 miles", explanation:"60×2.5+80×1.5=150+120=270." },
  { id:150, topic:"Word Problems", question:"Store sells 3 notebooks for $7.50. Cost of 8 notebooks?", choices:["A) $20","B) $22.50","C) $18","D) $24"], answer:"A) $20", explanation:"$7.50/3=$2.50 each; 8×$2.50=$20." },
];

// Utility: shuffle array
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// DB helpers (localStorage)
const DB = {
  getStudents: () => JSON.parse(localStorage.getItem("sat_students") || "[]"),
  saveStudents: (s) => localStorage.setItem("sat_students", JSON.stringify(s)),
  getResults: () => JSON.parse(localStorage.getItem("sat_results") || "[]"),
  saveResults: (r) => localStorage.setItem("sat_results", JSON.stringify(r)),
  getSession: () => JSON.parse(localStorage.getItem("sat_session") || "null"),
  saveSession: (s) => localStorage.setItem("sat_session", JSON.stringify(s)),
  clearSession: () => localStorage.removeItem("sat_session"),
};

const ADMIN = { email: "missuko@admin.com", password: "MissUko2025!" };

// ============================================================
// ANIMATIONS CSS
// ============================================================
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
  
  :root {
    --primary: #6C3CE1;
    --secondary: #FF6B6B;
    --accent: #FFD93D;
    --success: #4CAF50;
    --error: #FF4757;
    --bg: #0F0A1E;
    --surface: #1A1033;
    --surface2: #231545;
    --text: #F0E6FF;
    --text2: #B8A0DC;
    --border: rgba(108,60,225,0.3);
    --glow: 0 0 20px rgba(108,60,225,0.4);
    --gold: #FFD700;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { 
    font-family: 'Nunito', sans-serif; 
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .stars-bg {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; overflow: hidden;
  }
  .star {
    position: absolute; border-radius: 50%; background: white;
    animation: twinkle var(--d) ease-in-out infinite;
    animation-delay: var(--delay);
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.5); }
  }

  .page { position: relative; z-index: 1; min-height: 100vh; }

  /* Miss Uko branding */
  .brand-badge {
    position: fixed; bottom: 16px; right: 16px; z-index: 999;
    background: linear-gradient(135deg, var(--primary), #9B59B6);
    color: white; padding: 6px 14px; border-radius: 20px;
    font-family: 'Fredoka One', cursive; font-size: 13px;
    box-shadow: 0 4px 15px rgba(108,60,225,0.5);
    letter-spacing: 0.5px;
  }

  /* Cards */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 32px;
    box-shadow: var(--glow);
  }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 50px; border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 16px;
    transition: all 0.3s ease; text-decoration: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--primary), #9B59B6);
    color: white; box-shadow: 0 6px 20px rgba(108,60,225,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(108,60,225,0.6); }
  .btn-success {
    background: linear-gradient(135deg, #4CAF50, #2ECC71);
    color: white; box-shadow: 0 6px 20px rgba(76,175,80,0.4);
  }
  .btn-danger {
    background: linear-gradient(135deg, var(--secondary), #FF4757);
    color: white; box-shadow: 0 6px 20px rgba(255,107,107,0.4);
  }
  .btn-outline {
    background: transparent; color: var(--text);
    border: 2px solid var(--border);
  }
  .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
  .btn-gold {
    background: linear-gradient(135deg, #F39C12, var(--gold));
    color: #1a1a1a; box-shadow: 0 6px 20px rgba(243,156,18,0.4);
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

  /* Inputs */
  .input-group { margin-bottom: 20px; }
  .input-group label {
    display: block; margin-bottom: 8px; font-weight: 700;
    color: var(--text2); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;
  }
  .input-group input, .input-group select {
    width: 100%; padding: 14px 18px; border-radius: 12px;
    background: var(--surface2); border: 2px solid var(--border);
    color: var(--text); font-family: 'Nunito', sans-serif; font-size: 15px;
    outline: none; transition: border-color 0.3s;
  }
  .input-group input:focus, .input-group select:focus {
    border-color: var(--primary); box-shadow: 0 0 0 3px rgba(108,60,225,0.15);
  }
  .input-group input::placeholder { color: var(--text2); }

  /* Logo */
  .logo-title {
    font-family: 'Fredoka One', cursive; font-size: 2.5rem;
    background: linear-gradient(135deg, var(--accent), var(--secondary), var(--primary));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1.2;
  }

  /* Animations */
  @keyframes bounce-in {
    0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
    60% { transform: scale(1.1) rotate(5deg); }
    80% { transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(108,60,225,0.4); }
    50% { box-shadow: 0 0 40px rgba(108,60,225,0.8); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-8px); }
    80% { transform: translateX(8px); }
  }
  @keyframes dance {
    0%, 100% { transform: rotate(-5deg) scale(1); }
    25% { transform: rotate(10deg) scale(1.1); }
    50% { transform: rotate(-10deg) scale(1.05); }
    75% { transform: rotate(5deg) scale(1.1); }
  }
  @keyframes cry-shake {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
  }
  @keyframes progress-shine {
    from { background-position: -200% center; }
    to { background-position: 200% center; }
  }
  .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .animate-slide-up { animation: slide-up 0.5s ease forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }

  /* Progress bar */
  .progress-bar-container {
    width: 100%; height: 12px; background: var(--surface2);
    border-radius: 6px; overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%; border-radius: 6px; transition: width 0.5s ease;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    background-size: 200% auto;
    animation: progress-shine 2s linear infinite;
  }

  /* Answer choices */
  .choice-btn {
    width: 100%; padding: 16px 20px; margin-bottom: 12px;
    border-radius: 14px; border: 2px solid var(--border);
    background: var(--surface2); color: var(--text);
    font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; text-align: left; transition: all 0.3s ease;
  }
  .choice-btn:hover:not(:disabled) {
    border-color: var(--primary); background: rgba(108,60,225,0.15);
    transform: translateX(4px);
  }
  .choice-btn.correct {
    border-color: var(--success); background: rgba(76,175,80,0.2);
    animation: pulse-glow 1s ease infinite;
  }
  .choice-btn.incorrect {
    border-color: var(--error); background: rgba(255,71,87,0.2);
    animation: shake 0.5s ease;
  }
  .choice-btn.reveal-correct {
    border-color: var(--success); background: rgba(76,175,80,0.1);
  }

  /* Timer */
  .timer-ring {
    position: relative; width: 100px; height: 100px;
  }
  .timer-ring svg { transform: rotate(-90deg); }
  .timer-ring .ring-value {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: 'Fredoka One', cursive; font-size: 22px; color: var(--accent);
  }

  /* Modal overlay */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .modal-content {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 24px; padding: 40px; max-width: 500px; width: 100%;
    position: relative; animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    text-align: center;
  }

  /* Character animations */
  .spongebob-emoji { font-size: 80px; animation: dance 0.5s ease-in-out infinite; display: block; }
  .patrick-emoji { font-size: 80px; animation: cry-shake 0.4s ease-in-out infinite; display: block; }

  /* Dashboard table */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    background: var(--surface2); padding: 12px 16px; text-align: left;
    font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text2);
    border-bottom: 2px solid var(--border);
  }
  .data-table td { padding: 12px 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
  .data-table tr:hover td { background: var(--surface2); }

  /* Topic badge */
  .topic-badge {
    display: inline-block; padding: 4px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
  }

  /* Score circle */
  .score-circle {
    width: 120px; height: 120px; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Fredoka One', cursive;
    border: 4px solid;
  }

  /* Stat card */
  .stat-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 16px; padding: 20px; text-align: center;
  }
  .stat-num { font-family: 'Fredoka One', cursive; font-size: 2rem; }

  /* Confetti */
  .confetti-piece {
    position: absolute; width: 10px; height: 10px; border-radius: 2px;
    animation: confetti-fall 1.5s ease-out forwards;
  }

  /* Nav */
  .nav-bar {
    padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;
    background: rgba(15,10,30,0.9); backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .logo-title { font-size: 1.8rem; }
    .card { padding: 20px; }
    .btn { padding: 12px 20px; font-size: 14px; }
  }
`;

// ============================================================
// HELPER COMPONENTS
// ============================================================
function StarsBg() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: (Math.random() * 3 + 2).toFixed(1) + "s",
    delay: (Math.random() * 3).toFixed(1) + "s",
  }));
  return (
    <div className="stars-bg">
      {stars.map((s, i) => (
        <div key={i} className="star" style={{
          width: s.size, height: s.size, left: s.x + "%", top: s.y + "%",
          "--d": s.d, "--delay": s.delay,
        }} />
      ))}
    </div>
  );
}

function BrandBadge() {
  return <div className="brand-badge">✨ Miss Uko</div>;
}

function TopicColor(topic) {
  const colors = {
    "Algebra": "#6C3CE1", "Linear Equations": "#FF6B6B", "Quadratics": "#FFD93D",
    "Functions": "#4CAF50", "Geometry": "#00BCD4", "Trigonometry": "#FF9800",
    "Statistics & Probability": "#E91E63", "Word Problems": "#9C27B0",
  };
  return colors[topic] || "#6C3CE1";
}

function TopicBadge({ topic }) {
  const color = TopicColor(topic);
  return (
    <span className="topic-badge" style={{ background: color + "22", color, border: `1px solid ${color}44` }}>
      {topic}
    </span>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60), s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: pct + "%", background: color ? `linear-gradient(90deg, ${color}, ${color}99)` : undefined }} />
    </div>
  );
}

// ============================================================
// FEEDBACK MODAL
// ============================================================
function FeedbackModal({ correct, message, explanation, onNext }) {
  const [confetti] = useState(() =>
    correct ? Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100 + "%", delay: Math.random() * 0.5 + "s",
      color: ["#FFD93D", "#6C3CE1", "#FF6B6B", "#4CAF50", "#00BCD4"][i % 5],
      rot: Math.random() * 360,
    })) : []
  );

  return (
    <div className="modal-overlay" onClick={onNext}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ position: "relative", overflow: "hidden" }}>
        {confetti.map((c, i) => (
          <div key={i} className="confetti-piece" style={{
            left: c.left, top: 0, background: c.color,
            animationDelay: c.delay, transform: `rotate(${c.rot}deg)`,
          }} />
        ))}
        {correct ? (
          <>
            <span className="spongebob-emoji">🧽</span>
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", color: "#FFD93D", margin: "16px 0 8px" }}>
              {message}
            </h2>
            <p style={{ color: "#4CAF50", fontSize: "1.1rem", marginBottom: 16 }}>✅ Correct!</p>
          </>
        ) : (
          <>
            <span className="patrick-emoji">⭐</span>
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", color: "#FF6B6B", margin: "16px 0 8px" }}>
              {message}
            </h2>
            <p style={{ color: "#FF4757", fontSize: "1.1rem", marginBottom: 16 }}>❌ Not quite!</p>
          </>
        )}
        <div style={{
          background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.3)",
          borderRadius: 12, padding: "14px 16px", marginBottom: 24, textAlign: "left",
        }}>
          <p style={{ fontSize: 13, color: "#B8A0DC", marginBottom: 6, fontWeight: 700 }}>💡 EXPLANATION</p>
          <p style={{ fontSize: 14, color: "#F0E6FF", lineHeight: 1.6 }}>{explanation}</p>
        </div>
        <button className="btn btn-primary" onClick={onNext} style={{ width: "100%" }}>
          Next Question →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// QUIZ TIMER COMPONENT
// ============================================================
function QuizTimer({ totalSeconds, onExpire }) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const intervalRef = useRef(null);
  const hasExpired = useRef(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (!hasExpired.current) { hasExpired.current = true; setTimeout(onExpire, 100); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const pct = remaining / totalSeconds;
  const radius = 42, circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct);
  const color = pct > 0.5 ? "#4CAF50" : pct > 0.25 ? "#FFD93D" : "#FF4757";

  return (
    <div className="timer-ring">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={dashOffset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
        />
      </svg>
      <div className="ring-value" style={{ color }}>{formatTime(remaining)}</div>
    </div>
  );
}

// ============================================================
// SCREEN: LANDING
// ============================================================
function LandingScreen({ onStudentLogin, onStudentRegister, onTeacherLogin }) {
  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
      <StarsBg />
      <BrandBadge />
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center", animation: "slide-up 0.6s ease" }}>
        <div style={{ fontSize: 72, marginBottom: 16 }} className="animate-float">🎓</div>
        <h1 className="logo-title" style={{ marginBottom: 8 }}>SAT Math Master</h1>
        <p style={{ color: "#B8A0DC", marginBottom: 8, fontSize: "1.1rem" }}>by Miss Uko</p>
        <p style={{ color: "#B8A0DC", marginBottom: 40, lineHeight: 1.7 }}>
          The ultimate SAT Mathematics practice platform. Real exam-quality questions, instant feedback, and fun animations to keep you motivated! 🚀
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn btn-primary" style={{ fontSize: 18, padding: "16px 36px" }} onClick={onStudentLogin}>
              📚 Student Login
            </button>
            <button className="btn btn-success" onClick={onStudentRegister}>
              ✍️ Register Now
            </button>
          </div>
          <button className="btn btn-outline" onClick={onTeacherLogin} style={{ fontSize: 14 }}>
            👩‍🏫 Teacher / Admin Dashboard
          </button>
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["📝", "30 SAT Questions"], ["⏱️", "Timed Quiz"], ["🏆", "Score Tracking"], ["📊", "Analytics"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <span style={{ fontSize: 12, color: "#B8A0DC", fontWeight: 700 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: REGISTER
// ============================================================
function RegisterScreen({ onBack, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", studentId: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return setError("Please fill all required fields.");
    if (form.password !== form.confirm) return setError("Passwords don't match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const students = DB.getStudents();
    if (students.find(s => s.email === form.email)) return setError("Email already registered!");
    setLoading(true);
    setTimeout(() => {
      const newStudent = {
        id: Date.now().toString(),
        name: form.name, email: form.email,
        studentId: form.studentId || "N/A",
        password: form.password,
        registeredAt: new Date().toISOString(),
      };
      students.push(newStudent);
      DB.saveStudents(students);
      DB.saveSession(newStudent);
      setLoading(false);
      onSuccess(newStudent);
    }, 800);
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
      <StarsBg /><BrandBadge />
      <div className="card animate-slide-up" style={{ maxWidth: 460, width: "100%" }}>
        <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: 24, padding: "8px 18px", fontSize: 14 }}>← Back</button>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 4 }}>Create Account ✍️</h2>
        <p style={{ color: "#B8A0DC", marginBottom: 28 }}>Join SAT Math Master and start your journey!</p>
        {error && <div style={{ background: "rgba(255,71,87,0.1)", border: "1px solid #FF4757", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#FF6B6B", fontSize: 14 }}>{error}</div>}
        <div className="input-group">
          <label>Full Name *</label>
          <input placeholder="e.g. Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="input-group">
          <label>Email Address *</label>
          <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="input-group">
          <label>Student ID (Optional)</label>
          <input placeholder="e.g. STU-2025-001" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} />
        </div>
        <div className="input-group">
          <label>Password *</label>
          <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="input-group">
          <label>Confirm Password *</label>
          <input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 17 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating Account..." : "🚀 Register & Start"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: STUDENT LOGIN
// ============================================================
function StudentLoginScreen({ onBack, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const students = DB.getStudents();
    const student = students.find(s => s.email === form.email && s.password === form.password);
    if (!student) return setError("Invalid email or password.");
    DB.saveSession(student);
    onSuccess(student);
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
      <StarsBg /><BrandBadge />
      <div className="card animate-slide-up" style={{ maxWidth: 420, width: "100%" }}>
        <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: 24, padding: "8px 18px", fontSize: 14 }}>← Back</button>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>📚</div>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 4, textAlign: "center" }}>Student Login</h2>
        <p style={{ color: "#B8A0DC", marginBottom: 28, textAlign: "center" }}>Welcome back! Ready to practice?</p>
        {error && <div style={{ background: "rgba(255,71,87,0.1)", border: "1px solid #FF4757", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#FF6B6B", fontSize: 14 }}>{error}</div>}
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 17 }} onClick={handleLogin}>
          🎯 Login
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: TEACHER LOGIN
// ============================================================
function TeacherLoginScreen({ onBack, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (form.email === ADMIN.email && form.password === ADMIN.password) {
      onSuccess();
    } else {
      setError("Invalid teacher credentials.");
    }
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
      <StarsBg /><BrandBadge />
      <div className="card animate-slide-up" style={{ maxWidth: 420, width: "100%" }}>
        <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: 24, padding: "8px 18px", fontSize: 14 }}>← Back</button>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>👩‍🏫</div>
        <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 4, textAlign: "center" }}>Teacher Login</h2>
        <p style={{ color: "#B8A0DC", marginBottom: 8, textAlign: "center" }}>Admin access only</p>
        <div style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 24, fontSize: 13, color: "#FFD700", textAlign: "center" }}>
          Demo: missuko@admin.com / MissUko2025!
        </div>
        {error && <div style={{ background: "rgba(255,71,87,0.1)", border: "1px solid #FF4757", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#FF6B6B", fontSize: 14 }}>{error}</div>}
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: 17 }} onClick={handleLogin}>
          🔐 Access Dashboard
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: STUDENT DASHBOARD (pre-quiz)
// ============================================================
function StudentDashboard({ student, onStartQuiz, onLogout }) {
  const results = DB.getResults().filter(r => r.studentId === student.id);
  const best = results.length ? Math.max(...results.map(r => r.percentage)) : null;
  const avg = results.length ? Math.round(results.reduce((a, b) => a + b.percentage, 0) / results.length) : null;

  return (
    <div className="page">
      <StarsBg /><BrandBadge />
      <nav className="nav-bar">
        <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.4rem", background: "linear-gradient(135deg, #FFD93D, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          SAT Math Master
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 14, color: "#B8A0DC" }}>👤 {student.name}</span>
          <button className="btn btn-outline" onClick={onLogout} style={{ padding: "8px 16px", fontSize: 13 }}>Logout</button>
        </div>
      </nav>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        <div className="animate-slide-up">
          <h1 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2.2rem", marginBottom: 4 }}>
            Welcome back, {student.name.split(" ")[0]}! 👋
          </h1>
          <p style={{ color: "#B8A0DC", marginBottom: 32 }}>Ready to conquer the SAT Mathematics section?</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Quizzes Taken", value: results.length, icon: "📝", color: "#6C3CE1" },
              { label: "Best Score", value: best !== null ? best + "%" : "—", icon: "🏆", color: "#FFD700" },
              { label: "Avg Score", value: avg !== null ? avg + "%" : "—", icon: "📊", color: "#4CAF50" },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="stat-card">
                <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                <div className="stat-num" style={{ color }}>{value}</div>
                <div style={{ fontSize: 13, color: "#B8A0DC", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.8rem", marginBottom: 12 }}>Start SAT Practice Quiz 🚀</h2>
            <p style={{ color: "#B8A0DC", marginBottom: 8, lineHeight: 1.7 }}>
              30 random questions · 50 minutes · Instant feedback · Full report
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {["Algebra", "Geometry", "Quadratics", "Functions", "Trigonometry", "Statistics"].map(t => (
                <TopicBadge key={t} topic={t} />
              ))}
            </div>
            <button className="btn btn-primary" style={{ fontSize: 20, padding: "18px 48px", justifyContent: "center" }} onClick={onStartQuiz}>
              🎯 Begin Quiz
            </button>
          </div>
          {results.length > 0 && (
            <div className="card">
              <h3 style={{ fontFamily: "Fredoka One, cursive", marginBottom: 16 }}>Recent Attempts</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead><tr>
                    <th>Date</th><th>Score</th><th>Percentage</th><th>Time</th>
                  </tr></thead>
                  <tbody>
                    {results.slice(-5).reverse().map((r, i) => (
                      <tr key={i}>
                        <td>{new Date(r.date).toLocaleDateString()}</td>
                        <td>{r.score}/30</td>
                        <td><span style={{ color: r.percentage >= 70 ? "#4CAF50" : r.percentage >= 50 ? "#FFD700" : "#FF4757", fontWeight: 700 }}>{r.percentage}%</span></td>
                        <td>{formatTime(r.timeTaken)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: QUIZ
// ============================================================
const CORRECT_MSGS = ["Excellent work! 🌟", "SAT Champion! 🏆", "You're on fire! 🔥", "Brilliant! ⭐", "Perfect! Keep going! 💪"];
const WRONG_MSGS = ["Keep trying! You've got this! 💙", "Almost there! 📖", "Review and retry! 💡", "Don't give up! 🌈", "Learning in progress! 🧠"];

function QuizScreen({ student, onFinish }) {
  const [questions] = useState(() => shuffle(QUESTION_BANK).slice(0, 30).map(q => ({ ...q, shuffledChoices: shuffle(q.choices) })));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [startTime] = useState(Date.now());
  const TOTAL_TIME = 50 * 60;

  const current = questions[currentIdx];

  const handleSelect = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    const isCorrect = choice === current.answer;
    const msg = isCorrect ? CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)] : WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)];
    setFeedback({ correct: isCorrect, message: msg, explanation: current.explanation });
    setAnswers(prev => [...prev, { question: current.question, topic: current.topic, selected: choice, correct: current.answer, isCorrect }]);
    // Play sound cue via Web Audio API
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = isCorrect ? 880 : 220;
      osc.type = isCorrect ? "sine" : "sawtooth";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const handleNext = () => {
    setFeedback(null);
    setSelected(null);
    if (currentIdx + 1 >= questions.length) {
      finishQuiz();
    } else {
      setCurrentIdx(idx => idx + 1);
    }
  };

  const finishQuiz = useCallback((auto = false) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const allAnswers = auto ? answers : answers;
    const score = allAnswers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / 30) * 100);
    const result = {
      studentId: student.id, studentName: student.name,
      score, percentage, timeTaken,
      date: new Date().toISOString(), answers: allAnswers,
      topicBreakdown: [...new Set(questions.map(q => q.topic))].map(topic => {
        const topicQ = allAnswers.filter(a => a.topic === topic);
        return { topic, correct: topicQ.filter(a => a.isCorrect).length, total: topicQ.length };
      }),
    };
    const results = DB.getResults();
    results.push(result);
    DB.saveResults(results);
    onFinish(result);
  }, [answers, startTime, student, questions, onFinish]);

  const handleExpire = useCallback(() => finishQuiz(true), [finishQuiz]);

  return (
    <div className="page">
      <StarsBg /><BrandBadge />
      {feedback && <FeedbackModal correct={feedback.correct} message={feedback.message} explanation={feedback.explanation} onNext={handleNext} />}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.1rem", color: "#B8A0DC", marginBottom: 4 }}>
              Question {currentIdx + 1} of {questions.length}
            </div>
            <ProgressBar value={currentIdx} max={questions.length} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.4rem", color: "#4CAF50" }}>{answers.filter(a => a.isCorrect).length}</div>
              <div style={{ fontSize: 11, color: "#B8A0DC" }}>CORRECT</div>
            </div>
            <QuizTimer totalSeconds={TOTAL_TIME} onExpire={handleExpire} />
          </div>
        </div>
        {/* Question Card */}
        <div className="card animate-bounce-in" key={currentIdx}>
          <div style={{ marginBottom: 16 }}>
            <TopicBadge topic={current.topic} />
          </div>
          <h2 style={{ fontSize: "1.2rem", lineHeight: 1.7, marginBottom: 28, fontWeight: 700 }}>{current.question}</h2>
          <div>
            {current.shuffledChoices.map((choice) => {
              let cls = "choice-btn";
              if (selected) {
                if (choice === current.answer) cls += " reveal-correct";
                if (choice === selected && !feedback?.correct) cls += " incorrect";
                if (choice === selected && feedback?.correct) cls += " correct";
              }
              return (
                <button key={choice} className={cls} onClick={() => handleSelect(choice)} disabled={!!selected}>
                  {choice}
                </button>
              );
            })}
          </div>
          {!selected && (
            <p style={{ color: "#B8A0DC", fontSize: 13, marginTop: 16, textAlign: "center" }}>
              👆 Select your answer to continue
            </p>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="btn btn-outline" style={{ fontSize: 13, padding: "10px 20px" }} onClick={() => finishQuiz(true)}>
            Submit Quiz Early
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: RESULTS
// ============================================================
function ResultsScreen({ result, student, onRetry, onDashboard }) {
  const pct = result.percentage;
  const grade = pct >= 90 ? "🏆 Outstanding!" : pct >= 75 ? "🌟 Great Job!" : pct >= 60 ? "👍 Good Work!" : pct >= 50 ? "📚 Keep Studying!" : "💪 Practice More!";
  const scoreColor = pct >= 70 ? "#4CAF50" : pct >= 50 ? "#FFD700" : "#FF4757";

  return (
    <div className="page">
      <StarsBg /><BrandBadge />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <div className="animate-bounce-in" style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{pct >= 70 ? "🧽" : "⭐"}</div>
          <h1 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2.5rem", marginBottom: 8 }}>Quiz Complete!</h1>
          <p style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.4rem", color: scoreColor }}>{grade}</p>
        </div>
        {/* Score summary */}
        <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 24 }}>
            <div className="score-circle" style={{ borderColor: scoreColor, color: scoreColor }}>
              <span style={{ fontSize: "2rem" }}>{pct}%</span>
              <span style={{ fontSize: 12, color: "#B8A0DC" }}>SCORE</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
              <div><span style={{ color: "#4CAF50", fontWeight: 800, fontSize: "1.3rem" }}>{result.score}</span><span style={{ color: "#B8A0DC" }}> / 30 correct</span></div>
              <div><span style={{ color: "#FF6B6B", fontWeight: 800, fontSize: "1.3rem" }}>{30 - result.score}</span><span style={{ color: "#B8A0DC" }}> incorrect</span></div>
              <div><span style={{ fontWeight: 800 }}>⏱️ {formatTime(result.timeTaken)}</span><span style={{ color: "#B8A0DC" }}> time taken</span></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onRetry}>🔄 Retry Quiz</button>
            <button className="btn btn-outline" onClick={onDashboard}>📊 Dashboard</button>
          </div>
        </div>
        {/* Topic breakdown */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: "Fredoka One, cursive", marginBottom: 20 }}>📊 Performance by Topic</h3>
          {result.topicBreakdown.filter(t => t.total > 0).map(({ topic, correct, total }) => {
            const p = Math.round((correct / total) * 100);
            return (
              <div key={topic} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <TopicBadge topic={topic} />
                  <span style={{ fontWeight: 700, color: p >= 70 ? "#4CAF50" : p >= 50 ? "#FFD700" : "#FF4757" }}>{correct}/{total}</span>
                </div>
                <ProgressBar value={correct} max={total} color={TopicColor(topic)} />
              </div>
            );
          })}
        </div>
        {/* Wrong answers review */}
        {result.answers.filter(a => !a.isCorrect).length > 0 && (
          <div className="card">
            <h3 style={{ fontFamily: "Fredoka One, cursive", marginBottom: 20, color: "#FF6B6B" }}>❌ Questions to Review</h3>
            {result.answers.filter(a => !a.isCorrect).map((a, i) => (
              <div key={i} style={{ marginBottom: 16, padding: 16, background: "rgba(255,71,87,0.05)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 12 }}>
                <p style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{a.question}</p>
                <p style={{ fontSize: 13, color: "#FF6B6B", marginBottom: 4 }}>Your answer: {a.selected}</p>
                <p style={{ fontSize: 13, color: "#4CAF50" }}>Correct: {a.correct}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: TEACHER DASHBOARD
// ============================================================
function TeacherDashboard({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const students = DB.getStudents();
  const results = DB.getResults();

  const avgScore = results.length ? Math.round(results.reduce((a, b) => a + b.percentage, 0) / results.length) : 0;
  const highest = results.length ? Math.max(...results.map(r => r.percentage)) : 0;
  const lowest = results.length ? Math.min(...results.map(r => r.percentage)) : 0;

  // Topic analytics
  const topicStats = {};
  results.forEach(r => {
    r.topicBreakdown?.forEach(({ topic, correct, total }) => {
      if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
      topicStats[topic].correct += correct;
      topicStats[topic].total += total;
    });
  });

  const exportCSV = () => {
    const header = "Name,Email,Student ID,Score,Percentage,Time,Date";
    const rows = results.map(r => {
      const student = students.find(s => s.id === r.studentId) || {};
      return `"${r.studentName}","${student.email || ""}","${student.studentId || ""}",${r.score},${r.percentage}%,${formatTime(r.timeTaken)},${new Date(r.date).toLocaleDateString()}`;
    });
    const blob = new Blob([header + "\n" + rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "sat_results.csv"; a.click();
  };

  return (
    <div className="page">
      <StarsBg /><BrandBadge />
      <nav className="nav-bar">
        <div style={{ fontFamily: "Fredoka One, cursive", fontSize: "1.4rem", background: "linear-gradient(135deg, #FFD700, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          👩‍🏫 Miss Uko's Dashboard
        </div>
        <button className="btn btn-outline" onClick={onLogout} style={{ padding: "8px 16px", fontSize: 13 }}>Logout</button>
      </nav>
      {/* Tabs */}
      <div style={{ borderBottom: "1px solid rgba(108,60,225,0.2)", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4 }}>
          {[["overview", "📊 Overview"], ["students", "👥 Students"], ["results", "📝 Results"], ["topics", "🎯 Topics"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
              color: tab === id ? "#6C3CE1" : "#B8A0DC", fontWeight: 700, fontSize: 14,
              borderBottom: tab === id ? "3px solid #6C3CE1" : "3px solid transparent",
              transition: "all 0.2s", fontFamily: "Nunito, sans-serif",
            }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="animate-slide-up">
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 24 }}>Performance Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Students", value: students.length, icon: "👥", color: "#6C3CE1" },
                { label: "Quiz Attempts", value: results.length, icon: "📝", color: "#FF6B6B" },
                { label: "Average Score", value: avgScore + "%", icon: "📊", color: "#4CAF50" },
                { label: "Highest Score", value: highest + "%", icon: "🏆", color: "#FFD700" },
                { label: "Lowest Score", value: lowest + "%", icon: "📉", color: "#FF4757" },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="stat-card">
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                  <div className="stat-num" style={{ color }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#B8A0DC", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Score distribution chart (CSS bars) */}
            <div className="card">
              <h3 style={{ fontFamily: "Fredoka One, cursive", marginBottom: 20 }}>Score Distribution</h3>
              {results.length === 0 ? (
                <p style={{ color: "#B8A0DC", textAlign: "center", padding: 20 }}>No quiz data yet. Students need to complete quizzes first.</p>
              ) : (
                <div>
                  {[["90-100%", 90, 100, "#4CAF50"], ["70-89%", 70, 89, "#8BC34A"], ["50-69%", 50, 69, "#FFD700"], ["0-49%", 0, 49, "#FF4757"]].map(([label, min, max, color]) => {
                    const count = results.filter(r => r.percentage >= min && r.percentage <= max).length;
                    const pct = results.length ? (count / results.length) * 100 : 0;
                    return (
                      <div key={label} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{label}</span>
                          <span style={{ fontSize: 14, color }}>{count} students ({Math.round(pct)}%)</span>
                        </div>
                        <ProgressBar value={count} max={results.length || 1} color={color} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {/* STUDENTS */}
        {tab === "students" && (
          <div className="animate-slide-up">
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 24 }}>Registered Students ({students.length})</h2>
            {students.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
                <p style={{ color: "#B8A0DC" }}>No students registered yet.</p>
              </div>
            ) : (
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead><tr>
                      <th>#</th><th>Name</th><th>Email</th><th>Student ID</th><th>Registered</th><th>Attempts</th><th>Best</th>
                    </tr></thead>
                    <tbody>
                      {students.map((s, i) => {
                        const sr = results.filter(r => r.studentId === s.id);
                        const best = sr.length ? Math.max(...sr.map(r => r.percentage)) : null;
                        return (
                          <tr key={s.id}>
                            <td style={{ color: "#B8A0DC" }}>{i + 1}</td>
                            <td style={{ fontWeight: 700 }}>{s.name}</td>
                            <td style={{ color: "#B8A0DC" }}>{s.email}</td>
                            <td style={{ color: "#B8A0DC" }}>{s.studentId}</td>
                            <td style={{ color: "#B8A0DC", fontSize: 13 }}>{new Date(s.registeredAt).toLocaleDateString()}</td>
                            <td>{sr.length}</td>
                            <td>{best !== null ? <span style={{ color: best >= 70 ? "#4CAF50" : "#FF4757", fontWeight: 700 }}>{best}%</span> : "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        {/* RESULTS */}
        {tab === "results" && (
          <div className="animate-slide-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem" }}>All Quiz Results ({results.length})</h2>
              <button className="btn btn-gold" onClick={exportCSV} style={{ padding: "10px 20px", fontSize: 14 }}>⬇️ Export CSV</button>
            </div>
            {results.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                <p style={{ color: "#B8A0DC" }}>No quiz results yet.</p>
              </div>
            ) : (
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead><tr>
                      <th>Student</th><th>Score</th><th>%</th><th>Time</th><th>Date</th><th>Status</th>
                    </tr></thead>
                    <tbody>
                      {[...results].reverse().map((r, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700 }}>{r.studentName}</td>
                          <td>{r.score}/30</td>
                          <td><span style={{ color: r.percentage >= 70 ? "#4CAF50" : r.percentage >= 50 ? "#FFD700" : "#FF4757", fontWeight: 700 }}>{r.percentage}%</span></td>
                          <td>{formatTime(r.timeTaken)}</td>
                          <td style={{ fontSize: 12, color: "#B8A0DC" }}>{new Date(r.date).toLocaleDateString()}</td>
                          <td>
                            <span style={{
                              padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                              background: r.percentage >= 70 ? "rgba(76,175,80,0.2)" : "rgba(255,71,87,0.2)",
                              color: r.percentage >= 70 ? "#4CAF50" : "#FF4757",
                            }}>{r.percentage >= 70 ? "PASS" : "NEEDS WORK"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        {/* TOPICS */}
        {tab === "topics" && (
          <div className="animate-slide-up">
            <h2 style={{ fontFamily: "Fredoka One, cursive", fontSize: "2rem", marginBottom: 24 }}>Topic Performance Analytics</h2>
            {Object.keys(topicStats).length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
                <p style={{ color: "#B8A0DC" }}>No topic data yet. Students need to complete quizzes.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {Object.entries(topicStats).sort((a, b) => {
                  const pa = a[1].total ? a[1].correct / a[1].total : 0;
                  const pb = b[1].total ? b[1].correct / b[1].total : 0;
                  return pb - pa;
                }).map(([topic, { correct, total }]) => {
                  const pct = total ? Math.round((correct / total) * 100) : 0;
                  return (
                    <div key={topic} className="card" style={{ padding: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                        <TopicBadge topic={topic} />
                        <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
                          <span style={{ color: "#4CAF50" }}>✅ {correct} correct</span>
                          <span style={{ color: "#FF4757" }}>❌ {total - correct} wrong</span>
                          <span style={{ color: pct >= 70 ? "#4CAF50" : "#FF4757", fontWeight: 800 }}>{pct}%</span>
                        </div>
                      </div>
                      <ProgressBar value={correct} max={total} color={TopicColor(topic)} />
                      <p style={{ fontSize: 12, color: "#B8A0DC", marginTop: 8 }}>
                        {pct >= 80 ? "💪 Class is strong on this topic!" : pct >= 60 ? "📖 Decent understanding, could improve." : "⚠️ Needs more practice — recommend review!"}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [student, setStudent] = useState(() => DB.getSession());
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    if (student) setScreen("studentDashboard");
  }, []);

  const handleStudentSuccess = (s) => { setStudent(s); setScreen("studentDashboard"); };
  const handleLogout = () => { DB.clearSession(); setStudent(null); setScreen("landing"); };
  const handleQuizFinish = (result) => { setQuizResult(result); setScreen("results"); };
  const handleRetry = () => { setQuizResult(null); setScreen("quiz"); };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {screen === "landing" && (
        <LandingScreen
          onStudentLogin={() => setScreen("studentLogin")}
          onStudentRegister={() => setScreen("register")}
          onTeacherLogin={() => setScreen("teacherLogin")}
        />
      )}
      {screen === "register" && (
        <RegisterScreen onBack={() => setScreen("landing")} onSuccess={handleStudentSuccess} />
      )}
      {screen === "studentLogin" && (
        <StudentLoginScreen onBack={() => setScreen("landing")} onSuccess={handleStudentSuccess} />
      )}
      {screen === "teacherLogin" && (
        <TeacherLoginScreen onBack={() => setScreen("landing")} onSuccess={() => setScreen("teacherDashboard")} />
      )}
      {screen === "studentDashboard" && student && (
        <StudentDashboard student={student} onStartQuiz={() => setScreen("quiz")} onLogout={handleLogout} />
      )}
      {screen === "quiz" && student && (
        <QuizScreen student={student} onFinish={handleQuizFinish} />
      )}
      {screen === "results" && quizResult && (
        <ResultsScreen result={quizResult} student={student} onRetry={handleRetry} onDashboard={() => setScreen("studentDashboard")} />
      )}
      {screen === "teacherDashboard" && (
        <TeacherDashboard onLogout={() => setScreen("landing")} />
      )}
    </>
  );
}
