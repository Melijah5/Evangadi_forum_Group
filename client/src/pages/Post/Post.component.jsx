import React, {useEffect, Fragment,useState} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { getQuestion, deleteQuestion } from '../../redux/questions/questions.action';
import { getAnswers, deleteAnswer, addAnswer } from '../../redux/answers/answers.actions';
import { getComments, deleteComment, addComment } from '../../redux/comments/comments.actions';

// import { ReactComponent as UpVote } from '../../assets/ArrowUpLg.svg';
// import { ReactComponent as DownVote } from '../../assets/ArrowDownLg.svg';

// import SideBar from '../../components/SideBar/SideBar.component';
// import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './Post.styles.scss'

const Post = ({ deleteQuestion, deleteAnswer, addAnswer, deleteComment, addComment, getAnswers, getComments, auth, getQuestion, answer: { answers }, comment: { comments }, question: { question, loading }, match }) => {
    const params = useParams();
    useEffect(() => {
        
        getQuestion(params.id);
        // getAnswers(params.id);
        // getComments(params.id);
        // eslint-disable-next-line
    }, [getQuestion, params]);

    const [ formData, setFormData ] = useState({
        body: ''
    });

    const { body } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addComment(match.params.id, {body});
        setFormData({
            body: ''
        });
    };

    const [ formDataAnswer, setFormDataAnswer ] = useState({
        text: ''
    });

    const { text } = formDataAnswer;

    const onChangeAnswer = e => setFormDataAnswer({ ...formData, [e.target.name]: e.target.value });

    const onSubmitAnswer = async e => {
        e.preventDefault();
        addAnswer(match.params.id,{text});
        setFormDataAnswer({
            text: ''
        });
    };

    return  <Fragment>
        <div className='page'>
            {/* <SideBar/> */}
            <div id="content">
                <div id='mainbar' className='post'>
                    <div className='question-header fc-black-800 pl24'>
                        
                        <div>
                            <Link className='s-btn s-btn__primary' to='/add/question'>
                                Ask Question<h1>{question}</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='question-date fc-black-800 pl24'>
                        <div className='grid-cell'>
                             <h1>{question}</h1>
                                <span className='fc-light'>
                                    Asked 
                                </span>
                            {/* <time dateTime={ moment(question.created_at).fromNow(true) }>
                                { moment(question.created_at).fromNow(true) } ago
                            </time> */}
                        </div>
                    </div>
                    {/* <div className='question-main pl24 pt16'>
                        <div className='question'>
                            <div className='post-layout'>
                                <div className='vote-cell fc-black-800'>
                                    <div className='stats'>
                                        <div className='vote'>
                                            <span className='vote-count'>{question.answer_count}</span>
                                            <div className='count-text'>answers</div>
                                        </div>
                                        <div className='vote'>
                                            <span className='vote-count'>{question.comment_count}</span>
                                            <div className='count-text'>comments</div>
                                        </div>
                                        <div className='vote'>
                                            <span className='vote-count'>1</span>
                                            <div className='count-text'>tags</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='post-cell'>
                                    <div className='post-text fc-black-800'>
                                        {question.qustion_description}
                                    </div>
                                    <div className='post-tags fc-black-800'>
                                        <div className='tag-cell'>
                                            <Link className='s-tag' to={`/tags/${question.tagname}`}>{question.tagname}</Link>
                                        </div>
                                    </div>
                                    <div className='post-actions fc-black-800'>
                                        <div className='post-actions-extended'>
                                            <div className='post-btns'>
                                                <div className='post-menu'>
                                                    <Link className='post-links' title='short permalink to this question' to='/'>
                                                        share
                                                    </Link>
                                                    <Link className='post-links' title='Follow this question to receive notifications' to='/'>
                                                        follow
                                                    </Link>
                                                    {!auth.loading && auth.isAuthenticated && parseInt(question.user_id) === auth.user.id && (
                                                        <Link
                                                            className='s-link s-link__danger'
                                                            style={{paddingLeft: '4px'}}
                                                            question='Delete the question'
                                                            onClick={e => deleteQuestion(question.id)}
                                                            to='/questions'
                                                        >
                                                            delete
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='post-owner'>
                                                <div className='user-block fc-black-500'>
                                                    <div className='action-time'>asked { moment(question.created_at).fromNow(true) } ago</div>
                                                    <div className='user-logo'>
                                                        <Link className='user-link' to={`/users/${question.user_id}`}>
                                                           
                                                        </Link>
                                                    </div>
                                                    <div className='user-profile'>
                                                        <Link className='user-profile-link fc-blue-600' to={`/users/${question.user_id}`}>{question.username}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='comments-cell'>
                                    <div className='comments'>
                                        <ul className='comments-list'>
                                            {comments.map(comment => (
                                                <li className='comments-item' key={comment.id} >
                                                    <div className='comment-text fc-black-800'>
                                                        <div className='comment-body'>
                                                                <span className='body'>
                                                                {comment.comment}
                                                                </span>
                                                            &nbsp;&ndash;&nbsp;
                                                            <Link className='s-tag' to={`/users/${comment.user_id}`}>
                                                                {comment.username}
                                                            </Link>
                                                            <span title={ moment(comment.created_at).fromNow(true) }
                                                                  style={{color: '#959ca3 !important'}}
                                                                  className='date fs-body1'>
                                                                { moment(comment.created_at).fromNow(true) } ago
                                                            </span>
                                                        </div>
                                                        {!auth.loading && auth.isAuthenticated && parseInt(comment.user_id) === auth.user.id && (
                                                            <Link
                                                                className='s-tag s-tag__moderator'
                                                                style={{marginTop: '4px'}}
                                                                title='Delete the comment'
                                                                onClick={e => deleteComment(comment.id)}
                                                                to={`/questions/${question.id}`}
                                                            >
                                                                delete
                                                            </Link>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='add-comment'>
                                        {!auth.loading && auth.isAuthenticated ? <Fragment>
                                            <form className='comment-form' onSubmit={e => onSubmit(e)}>
                                                <div>
                                                    <input
                                                        className='title-input s-input'
                                                        type='text'
                                                        name='comment'
                                                        value={comments}
                                                        onChange={e => onChange(e)}
                                                        id='comment'
                                                        placeholder='add comment'
                                                    />
                                                </div>
                                            </form>
                                        </Fragment> : <Fragment>
                                            <Link to='/login'>
                                                <button type='button' className="s-btn">You need to login to add a comment</button>
                                            </Link>
                                        </Fragment>}

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='answer'>
                            <div className='answer-header fc-black-800'>
                                <div className='answer-sub-header'>
                                    <div className='answer-headline'>
                                        <h2>Answers</h2>
                                    </div>
                                    <div className="grid--cell">
                                        <div className=" grid s-btn-group js-filter-btn">
                                            <Link className="s-btn s-btn__filled is-selected"
                                               to="#"
                                               data-nav-xhref="" title="Answers with the latest activity first"
                                               data-value="active" data-shortcut="A">
                                                Active
                                            </Link>
                                            <Link className="s-btn s-btn__filled"
                                               to="#"
                                               data-nav-xhref="" title="Answers in the order they were provided"
                                               data-value="oldest" data-shortcut="O">
                                                Oldest
                                            </Link>
                                            <Link className="s-btn s-btn__filled"
                                               to="#"
                                               data-nav-xhref="" title="Answers with the highest score first"
                                               data-value="votes" data-shortcut="V">
                                                Votes
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {answers.map(answer => (
                                <div key={answer.id} className='answers'>
                                    <div className='answer-layout'>
                                        <div className='vote-cell'>
                                            <div className='vote-container'>
                                                <button
                                                    className='vote-up'
                                                    title='This answer is useful (click again to undo)'
                                                >
                                                    <UpVote className='icon'/>
                                                </button>
                                                <div className='vote-count fc-black-500'>0</div>
                                                <button
                                                    className='vote-down'
                                                    title='This answer is not useful (click again to undo)'
                                                >
                                                    <DownVote className='icon'/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='answer-item'>
                                            <div className='answer-content fc-black-800'>
                                                <p>
                                                    {answer.body}
                                                </p>
                                            </div>
                                            <div className='answer-actions'>
                                                <div className='action-btns'>
                                                    <div className='answer-menu'>
                                                        <Link className='answer-links' title='short permalink to this question' to='/'>
                                                            share
                                                        </Link>
                                                        <Link className='answer-links' title='Follow this question to receive notifications' to='/'>
                                                            follow
                                                        </Link>
                                                        {!auth.loading && auth.isAuthenticated && parseInt(answer.user_id) === auth.user.id && (
                                                            <Link
                                                                className='s-link s-link__danger'
                                                                style={{paddingLeft: '4px'}}
                                                                title='Delete the answer'
                                                                onClick={e => deleteAnswer(answer.id)}
                                                                to={`/questions/${question.id}`}
                                                            >
                                                                delete
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='answer-owner'>
                                                    <div className='answer-user'>
                                                        <div className='answer-user-time fc-black-500'>
                                                            answered&nbsp;
                                                            <span>{ moment(answer.created_at).fromNow(true) } ago</span>
                                                        </div>
                                                        <div className='answer-logo'>
                                                            <Link className='answer-user-link' to={`/users/${answer.user_id}`}>
                                                                <div className='answer-logo-wrapper'>
                                                                  
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className='answer-details'>
                                                            <Link className='answer-user-profile-link fc-blue-600' to={`/users/${answer.user_id}`}>{answer.username}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                            <div className='add-answer'>
                                {!auth.loading && auth.isAuthenticated ? <Fragment>
                                    <form
                                        className='answer-form'
                                        onSubmit={e => onSubmitAnswer(e)}
                                    >
                                        <div className='answer-grid'>
                                            <label className=' fc-black-800'>Your Answer</label>
                                            <textarea
                                                className='s-textarea'
                                                name='text'
                                                cols='30'
                                                rows='12'
                                                value={text}
                                                onChange={e => onChangeAnswer(e)}
                                                placeholder='Enter body with minimum 30 characters'
                                                id='text'
                                            >
                                            </textarea>
                                            <button className='s-btn s-btn__primary'>Post Your Answer</button>
                                        </div>
                                    </form>
                                </Fragment> : <Fragment>
                                    <Link to='/login'>
                                        <button type='button' style={{marginTop: '12px'}} className="s-btn s-btn__outlined">You need to login to add an answer</button>
                                    </Link>
                                </Fragment>}
                            </div>
                        </div>
                    </div> 
                </div>
                {/* <RightSideBar/> */}
            {/* </div> */}
        {/* </div> */}
    </Fragment>
};

Post.propTypes = {
    getQuestion: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getAnswers: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    auth: state.auth,
    answer: state.answer,
    comment: state.comment
});

export default connect(mapStateToProps, { getQuestion, deleteQuestion, deleteAnswer, deleteComment, getAnswers,addAnswer, getComments, addComment })(Post);