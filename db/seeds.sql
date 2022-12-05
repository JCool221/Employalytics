INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Executive');

INSERT INTO role (title, salary, department_id)
VALUES  ('Salesperson', 75000, 1),
        ('Junior Engineer', 120000, 2),
        ('Senior Engineer', 175000, 2),
        ('Accountant', 50000, 3),
        ('Auditor', 80000, 3),
        ('Attorney', 150000, 4),
        ('Analyst', 30000, 4),
        ('CEO', 1000000, 5),
        ('CFO', 750000, 5),
        ('CIO', 800000, 5),
        ('COO', 750000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Beth', 'Cooley', 8, NULL),
        ('Edwin', 'Molena', 9, 1),
        ('Justin', 'Alvarez', 10, 1),
        ('Phillip', 'Nichols', 1, 2),
        ('Aneesa', 'Whitehead', 11, 1),
        ('Ethel', 'Bauer', 1, 2),
        ('Poppie', 'Rocha', 3, 3),
        ('Xander', 'Grimes', 2, 7),
        ('Kevin', 'Jimenez', 2, 7),
        ('Ciara', 'Abbott', 5, 2),
        ('Amelia', 'Ellis', 6, 2),
        ('Vera', 'Sears', 6, 5),
        ('Solomon', 'Bonner', 7, 12),
        ('Ria', 'Rangel', 7,12);
