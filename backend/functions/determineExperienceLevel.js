function determineExperienceLevel(answers) {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    if (correctAnswers >= 5) return 'intermediate';
    if (correctAnswers >= 8) return 'advanced';
    return 'beginner';
}