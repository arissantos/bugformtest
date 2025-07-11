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
    country: faker.location.country(),
    emailAddress: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    ...overrides,
  }
  await page.goto('https://qa-practice.netlify.app/bugs-form/')

  // await page.getByRole('textbox', { name: 'First Name' }).fill(user.fname)
  // await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(user.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(user.pNumber)
  // await page.locator('#countries_dropdown_menu').selectOption(user.country);
  // await page.getByRole('textbox', { name: 'Enter email' }).fill(user.emailAddress)
  // await page.getByRole('textbox', { name: 'Password' }).fill(user.password)


  return user
}


test('Successful registration', async ({ page }) => {
  const doer = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(doer.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(doer.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(doer.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(doer.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(doer.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(doer.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Successfully registered the following information");
});

test('Required field:Lastname', async ({ page }) => {
  const doer = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(doer.fname)
  // await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(doer.lname)
  await page.getByRole('textbox', { name: 'Enter phone number' }).fill(doer.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(doer.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(doer.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(doer.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Missing Lastname");
});
test('Required field:PhoneNumber', async ({ page }) => {
  const doer = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(doer.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(doer.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(doer.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(doer.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(doer.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(doer.password)
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(notification).toHaveText("Missing PhoneNumber");
});
test('Required field:Email Address', async ({ page }) => {
  const doer = await user(page)
  const notification = page.getByText('Successfully registered the');
  // Fill in the form fields
  await page.getByRole('textbox', { name: 'First Name' }).fill(doer.fname)
  await page.getByRole('textbox', { name: 'Last Name* Phone nunber*' }).fill(doer.lname)
  // await page.getByRole('textbox', { name: 'Enter phone number' }).fill(doer.pNumber)
  await page.locator('#countries_dropdown_menu').selectOption(doer.country);
  await page.getByRole('textbox', { name: 'Enter email' }).fill(doer.emailAddress)
  await page.getByRole('textbox', { name: 'Password' }).fill(doer.password)
  await page.getByRole('button', { name: 'Register' }).click();
  try {
    await expect(notification).toHaveText("Missing Email Address");
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});