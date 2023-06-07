import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import App from '../App';
const failName= "asd"
test('hata olmadan render ediliyor', () => {
 render(<IletisimFormu></IletisimFormu>)

});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu></IletisimFormu>)
const test = screen.getByText("İletişim Formu")
expect(test).toBeInTheDocument()
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
render(<IletisimFormu></IletisimFormu>)
const input = screen.getByLabelText("Ad*")
userEvent.type(input,failName);

await waitFor ( ()=>
    expect(screen.queryByText("Hata: ad en az 5 karakter olmalıdır.")).toBeInTheDocument()
)


});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
render(<IletisimFormu/>)
userEvent.click(screen.getByText("Gönder"))
const errors =screen.getAllByTestId("error")
await waitFor (() =>
    expect(errors.length).toBe(3)
)
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu></IletisimFormu>)
    const name = screen.getByLabelText("Ad*")
    userEvent.type(name,"dogruuu")
    const surname = screen.getByLabelText("Soyad*")
    userEvent.type(surname,"asd")
    const email = screen.getByLabelText("Email*")
    userEvent.type(email,"sadasd")
    const errors = screen.getAllByTestId("error")
    userEvent.click(screen.getByText("Gönder"))
    await waitFor (() =>
    expect(errors.length).toBe(1)
)
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
render(<IletisimFormu></IletisimFormu>)
userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@gotmail.com"),"asd")

await waitFor(() =>{
expect(
    screen.queryByText("Hata: email geçerli bir email adresi olmalıdır.")).toBeInTheDocument()
})

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
   render(<IletisimFormu></IletisimFormu>)
    userEvent.type(screen.getByLabelText("Ad*"),"asdasd");
    userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@gotmail.com"),"ahmet@gmail.com")
    userEvent.click(screen.getByText("Gönder"))
    await waitFor(() => {
    expect(
        screen.queryByText("Hata: soyad gereklidir.")).toBeInTheDocument()
})
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    userEvent.type(screen.getByLabelText("Ad*"),"asdasd");
    userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@gotmail.com"),"ahmet@gmail.com")
    userEvent.click(screen.getByText("Gönder"))
    const surname = screen.getByLabelText("Soyad*")
    userEvent.type(surname,"asd")
    await waitFor(() => {
    expect(
        screen.queryAllByTestId("error").length).toBe(0)
})
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

});
