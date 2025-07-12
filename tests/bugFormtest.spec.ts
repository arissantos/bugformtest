import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker'


async function user(page: Page, overrides = {}) {
  const user = {
    fname: faker.person.fullName(),
    lname: faker.person.lastName(),
    pNumber: faker.string.numeric(12),
    country: "New Zealand",
    emailAddress: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    ...overrides,
  }

  await page.goto('https://qa-practice.netlify.app/bugs-form/')
  return user
}

test('Successful registration', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  await expect(notification).toHaveText("Successfully registered the following information");
});

test('Required field: Lastname', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  // await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  await expect(notification).toHaveText("Missing Lastname");
});
test('Required field: PhoneNumber', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  await expect(notification).toHaveText("Missing PhoneNumber");
});
test('PhoneNumber: Should only allow number', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill("this is not a number")
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  await expect(notification).toHaveText("Invalid PhoneNumber");
});
test('PhoneNumber: Should not be less than 10 digits', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill("123")
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  await expect(notification).toHaveText("The phone number should contain at least 10 characters!");
});
test('PhoneNumber: Should display correct field name', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  const phoneNumberField = page.getByText('Phone nunber*');
  await expect(phoneNumberField).toHaveText("Phone number*");
});

test('Required field: Email Address', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  try {
    await expect(notification).toHaveText("Missing Email Address");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Email Address: Should have @ sign ', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill("testemail.com") // Missing @ sign
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  try {
    await expect(notification).toHaveText("Invalid Email Address");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Required: Checkbox', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill("testemail.com") // Missing @ sign
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();

  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }
  try {
    await expect(notification).toHaveText("I agree with the terms and conditions checkbox is required");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Password: Should not be less than 6 characters  ', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill("testemail.com") // Missing @ sign
  await page.getByRole('textbox', { name: 'Password' }).fill("12345")
  await page.getByRole('button', { name: 'Register' }).click();

  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }

  await page.getByText('The password should contain').click();
  try {
    await expect(notification).toHaveText("The password should contain between [6,20] characters!");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Password: Should not be more than 20 characters  ', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.locator('#message');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill("testemail.com") // Missing @ sign
  await page.getByRole('textbox', { name: 'Password' }).fill("asdasd23a123dsdasdasd231sd23a1sd1as23d1a")
  await page.getByRole('button', { name: 'Register' }).click();

  const checkbox = page.getByRole('checkbox', { name: 'I agree with the terms and' });
  if (await checkbox.isEnabled()) {
    await checkbox.check();
  } else {
    console.error('Checkbox is disabled');
  }

  await page.getByText('The password should contain').click();
  try {
    await expect(notification).toHaveText("The password should contain between [6,20] characters!");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});