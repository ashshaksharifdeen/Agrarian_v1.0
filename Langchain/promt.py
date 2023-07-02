## Integrate our code OpenAI API
import os
from constants import openai_key
from langchain.llms import OpenAI
from langchain import PromptTemplate
from langchain.chains import LLMChain

from langchain.memory import ConversationBufferMemory

from langchain.chains import SequentialChain

from video_foot import index_cal

import streamlit as st

os.environ["OPENAI_API_KEY"]=openai_key

# streamlit framework

st.title('Celebrity Search Results')
input_text=st.text_input("Search the topic u want")

# Prompt Templates

def prompt_design(average_height,density,lai_,leaf_nitrogen_con,exg_green,ndi):
    first_input_prompt=PromptTemplate(
    input_variables=['LAI','NDI','LNC','Density','Height'],
    
    template="Tell me about the Rice plant paddy field health conditions based on the index as follows we get, LAI value={LAI}, Nitrogen deficiency index={NDI},Leaf Nitrogen concentration={LNC} as well as here we use point cloud for plant canopoy Analysis we Rice plants density as point per meter ={Density} as well as average height of plants calculated as poits per meter ={Height} using the above parameters give insigt full information about the plant health conditions from the Paddy field for the Farmers"
)

# Memory

    paddyfeild_memory = ConversationBufferMemory(input_key='name', memory_key='chat_history')
    dob_memory = ConversationBufferMemory(input_key='result', memory_key='soultion_history')


## OPENAI LLMS
    llm=OpenAI(temperature=0.8)
    chain=LLMChain(
    llm=llm,prompt=first_input_prompt,verbose=True,output_key='result',memory=paddyfeild_memory)

# Prompt Templates

    second_input_prompt=PromptTemplate(
    input_variables=['result'],
    template="what are the alternative solutions and works we can carry out from the {result} we optain from the paddy field"
)

    chain2=LLMChain(
    llm=llm,prompt=second_input_prompt,verbose=True,output_key='solution',memory=dob_memory)
# Prompt Templates

    parent_chain=SequentialChain(
    chains=[chain,chain2],input_variables=['LAI','NDI','LNC'],output_variables=['result','solution'],verbose=True)

    solution = parent_chain.run({
    'LAI': round(lai_,3),
    'NDI': round(ndi,3),
    "LNC": round(leaf_nitrogen_con,3),
    'Density':round(density,3),
    'Height':round(average_height,3)

    })

    return solution


"""if input_text:
    st.write(parent_chain({'LAI':input_text,'NDI':input_text,'LNC':input_text}))

    with st.expander('Results'): 
        st.info(paddyfeild_memory .buffer)

    with st.expander('Solutions'): 
        st.info(dob_memory.buffer)"""