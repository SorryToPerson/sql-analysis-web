export default `
    INSERT INTO
    tmp_salary (employee_id, total_salary)
    SELECT
    s.employee_id,
    SUM(s.salary) AS total_salary
    FROM
    salary s
    GROUP BY
    s.employee_id;
    CREATE
    OR REPLACE VIEW employee_income AS
    SELECT
    e.employee_id,
    e.name,
    e.gender,
    e.date_of_birth,
    e.date_of_hire,
    d.department_name,
    ts.total_salary,
    b.bonus
    FROM
    employee e
    INNER JOIN department d ON e.department_id = d.department_id
    INNER JOIN tmp_salary ts ON e.employee_id = ts.employee_id
    LEFT OUTER JOIN bonus b ON e.employee_id = b.employee_id;
`;
