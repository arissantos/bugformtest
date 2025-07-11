import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker'


async function user(page: Page, overrides = {}) {


  // const fName = this.page.getByRole('textbox', { name: 'First Name' });
  // const lName = this.page.getByRole('textbox', { name: 'Last Name* Phone nunber*' });
  // const pNumber = this.page.getByRole('textbox', { name: 'Enter phone number' });
  // const email = this.page.getByRole('textbox', { name: 'Enter email' });
  // const password = this.page.getByRole('textbox', { name: 'Password' });
  // const notification = this.page.getByText('Successfully registered the');

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
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Successfully registered the following information");
});

test('Required field:Lastname', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  // await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Missing Lastname");
});
test('Required field:PhoneNumber', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Missing PhoneNumber");
});
test('PhoneNumber: Should only allow number', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill("this is not a number")
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Invalid PhoneNumber");
});
test('PhoneNumber: Less than 10 digits', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill("123")
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Invalid PhoneNumber");
});
test('Required field:Email Address', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(bugForm.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  try {
    await expect(notification).toHaveText("Missing Email Address");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Email Address:should have @ sign ', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(bugForm.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(bugForm.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(bugForm.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(bugForm.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill("testemail.com") // Missing @ sign
  await page.getByRole('textbox', { name: 'Password' }).fill(bugForm.password)
  await page.getByRole('button', { name: 'Register' }).click();
  try {
    await expect(notification).toHaveText("Invalid Email Address");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
test('Required: Checkbox', async ({ page }) => {
  const bugForm = await user(page)
  const notification = page.getByText('Successfully registered the');
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
    await expect(notification).toHaveText("Successfully registered the following information");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});