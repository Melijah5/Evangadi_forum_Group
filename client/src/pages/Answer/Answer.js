import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestion } from '../../redux/questions/questions.action';
import { addAnswer } from '../../redux/answers/answers.actions';
import './Answer.css'

// import './QuestionForm.styles.scss';
// import YoutubeVideos from '../../components/Youtube/Youtube';
import { answer } from '../../redux/answers/answers.reducer';

const AnswerForm = ({ auth: { isAuthenticated, loading }, addAnswer }) => {

    const params = useParams();
    useEffect(() => {

        getQuestion(params.id);
        // getAnswers(params.id);
        // getComments(params.id);
        // eslint-disable-next-line
    }, [getQuestion, params]);

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        question: '',
        question_description: '',
        tagname: ''
    });

    const { question, question_description, tagname } = formData;

    const [formDataAnswer, setFormDataAnswer] = useState({
        text: ''
    });

    const { text } = formDataAnswer;
    const onChange = e => setFormDataAnswer({ ...formDataAnswer, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addAnswer({})
        getQuestion({ question, question_description, tagname });
        setFormData({
            question: '',
            question_description: '',
            tagname: ''
        });
    };

    const onSubmitAnswer = async e => {
        e.preventDefault();
        addAnswer({ text });
        setFormDataAnswer({
            text: ''
        });
    };

    if (!isAuthenticated) {
        return navigate('/login')
    }

    return loading === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='post-form-container'>
            <div className='post-form-content'>
                <div className='post-form-header'>
                    <div className='post-form-headline title-desc fc-black-800'>
                        {question}
                    </div>
                </div>
                <div className='post-form-section'>
                    <div className='postform' style={{ width: '100%' }}>
                        <form onSubmit={e => onSubmitAnswer(e)}>
                            <div className='question-form p16 s-card'>
                                <div className='question-layout'>
                                    <div className='title-grid'>
                                       
                                            <p className='title-desc fs-caption fc-black-700'>
                                                {question}
                                            </p>
                                        
                                    </div>
                                    <div className='body-grid '>
                                        <label className='form-label s-label fc-black-700'>
                                            Write your answer
                                            
                                        </label>
                                        <textarea
                                            className='s-textarea'
                                            name='text'
                                            cols='30'
                                            rows='9'
                                            value={text}
                                            onChange={e => onChange(e)}
                                            placeholder='Enter you answer with minimum 30 characters'
                                            id='answer'
                                        >
                                        </textarea>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='post-button mt32'>
                                <button className='bn632-hover bn23 s-btnt s-btn__primary' id='submit-button' name='submit-button'>Send your answer</button>
                            </div>
                        </form>
                    </div>
                    <aside>
                        <div className='right-panel'>
                            <div className='widget'>
                                {/* <YoutubeVideos /> */}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </Fragment>
};

AnswerForm.propTypes = {
    addAnswer: PropTypes.func.isRequired,
    getQuestion: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addAnswer })(AnswerForm);