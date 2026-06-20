export function calculateCgpa(completedCourses = [], fallbackGpa = '—') {
  let totalPoints = 0;
  let totalCreditsDone = 0;

  completedCourses.forEach(course => {
    totalPoints += (course.gp ?? 0) * course.credits;
    totalCreditsDone += course.credits;
  });

  const cgpa = totalCreditsDone > 0
    ? (totalPoints / totalCreditsDone).toFixed(2)
    : fallbackGpa;

  return {
    cgpa,
    totalCreditsDone,
  };
}