SELECT r.id, r.title, r.salary, d.name FROM role AS r JOIN department AS d ON r.department_id = d.id;

-- SELECT  e.id, e.first_name, e.last_name, r.title, 
-- r.salary, d.name, m.first_name AS man_first_name, m.last_name AS man_last_name
-- FROM employee AS e
-- LEFT JOIN role AS r
-- ON e.role_id = r.id
-- LEFT JOIN department AS d
-- ON r.department_id = d.id
-- LEFT JOIN employee AS m
-- ON e.manager_id = m.id;
