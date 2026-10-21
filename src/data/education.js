/**
 * Education records.
 *
 * `start` / `end` are 'YYYY-MM-DD'. `grade` is optional — omit the field
 * entirely rather than leaving an empty string.
 */

export const education = [
  {
    id: 'bsc-computer-science',
    degree: 'Bachelor of Computer Science',
    institution: 'Noble College of Arts and Science for Women',
    start: '2022-06-01',
    end: '2025-05-31',
    periodLabel: '2022 – 2025',
    grade: 'CGPA: 7.67',
    gradeLabel: 'CGPA',
    level: 'Undergraduate',
    color: '#00d4ff',
    focus:
      'Specialised in Computer Science with a focus on software development, data structures, algorithms and web technologies.',
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: "S.B.K. Girls' Higher Secondary School",
    start: '2021-06-01',
    end: '2022-03-31',
    periodLabel: '2021 – 2022',
    grade: '68.667%',
    gradeLabel: 'Percentage',
    level: 'Class XII',
    color: '#7c3aed',
    focus:
      'Completed Higher Secondary education with a focus on Mathematics, Computer Science and related subjects.',
  },
  {
    id: 'sslc',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: "S.B.K. Girls' Higher Secondary School",
    start: '2019-06-01',
    end: '2020-03-31',
    periodLabel: '2019 – 2020',
    grade: '73.8%',
    gradeLabel: 'Percentage',
    level: 'Class X',
    color: '#f72585',
    focus:
      'Completed secondary schooling with a strong foundation in core sciences and mathematics.',
  },
];

export default education;
