import os
import secrets
from PIL import Image
from flask import render_template, redirect, flash, url_for, request, abort
from datum import app, db, bcrypt
from datum.forms import RegistrationForm, LoginForm
from datum.models import User, Note
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/', methods=['GET', 'POST'])
@app.route('/user_notes', methods=['GET', 'POST'])
def home():
    if current_user.is_authenticated:
        user = User.query.filter_by(username=current_user.username).first_or_404()
        notes = Note.query.filter_by(author=user).order_by(Note.date_posted.desc())
        return render_template('Datum_home.html', notes=notes)
    else:
        return render_template('Datum_home.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('sign_up.html', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', form=form)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

    

@app.route('/note/new', methods=['GET', 'POST'])
@login_required
def new_note():
    if request.method == 'POST':
        note_title = request.form['userEntryTitle']
        note_content = request.form['userEntryContent']
        if note_title == '' and note_content != '':
            note_title = 'Untitled note'
        if note_title == '' and note_content == '':
            flash('Please enter a note before submitting')
            return redirect(url_for('home'))
        new_note = Note(title=note_title, content=note_content, author=current_user)
        db.session.add(new_note)
        db.session.commit()
        return redirect(url_for('home'))
    else:
        return render_template('Datum_home.html')


@app.route('/note/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def edit(id):
    note = Note.query.get_or_404(id)
    
    if request.method == 'POST':
        note.title = request.form['userEntryTitle']
        note.content = request.form['userEntryContent']
        if note.title == '' and note.content == '':
            flash('Please enter a note before submitting')
            return render_template('Datum_view_notes.html', note=note)
        db.session.commit()
        return redirect(url_for('home'))
    else:
        return render_template('Datum_view_notes.html', note=note)


@app.route('/note/delete/<int:id>')
def delete(id):
    note = Note.query.get_or_404(id)
    db.session.delete(note)
    db.session.commit()
    return redirect(url_for('home'))